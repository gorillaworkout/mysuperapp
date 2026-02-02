import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

async function renderApp(appPath, basePath, req, res) {
  try {
    console.log(`[SSR] Attempting to render: ${appPath}`);
    const { Esmx } = await import('@esmx/core');
    console.log(`[SSR] ESMX loaded`);
    
    // Load the node entry module which contains ESMX options
    const nodeEntryPath = join(__dirname, appPath.replace('index.mjs', 'node/src/entry.node.mjs'));
    console.log(`[SSR] Loading node entry: ${nodeEntryPath}`);
    
    const nodeModule = await import(nodeEntryPath);
    const options = typeof nodeModule.default === 'function' 
      ? nodeModule.default() 
      : nodeModule.default;
    
    console.log(`[SSR] Options loaded, initializing ESMX...`);
    
    const esmx = new Esmx(options);
    await esmx.init(esmx.COMMAND.start);
    console.log(`[SSR] ESMX initialized`);
    
    // Use esmx.render() to get RenderContext
    const rc = await esmx.render({
      base: basePath,
      params: { url: req.url, method: req.method }
    });
    console.log(`[SSR] Rendered, HTML length: ${rc.html ? rc.html.length : 0}`);
    
    // Handle redirects
    if (rc.redirect) {
      res.writeHead(302, { Location: rc.redirect });
      res.end();
      console.log(`[SSR] Redirect to: ${rc.redirect}`);
      return true;
    }
    
    // Handle custom status codes
    if (rc.status) {
      res.statusCode = rc.status;
    }
    
    if (rc.html) {
      res.writeHead(res.statusCode || 200, { 'Content-Type': 'text/html' });
      res.end(rc.html);
      console.log(`[SSR] Response sent successfully`);
      return true;
    }
    
    console.log(`[SSR] No HTML rendered, returning false`);
    return false;
  } catch (error) {
    console.error(`[SSR ERROR] Failed to render ${appPath}:`, error.message);
    console.error(error.stack);
    return false;
  }
}

const server = createServer(async (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let url = req.url.split('?')[0];

  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: 'ESMX SSR Server',
      version: '2.0.0'
    }));
    return;
  }

  if (url === '/' || url === '/index.html') {
    const rendered = await renderApp('./my-super-app/ssr-hub/dist/index.mjs', '/', req, res);
    if (rendered) return;
  } else if (url.startsWith('/react')) {
    const rendered = await renderApp('./my-super-app/ssr-react/dist/index.mjs', '/react', req, res);
    if (rendered) return;
  } else if (url.startsWith('/vue2')) {
    const rendered = await renderApp('./my-super-app/ssr-vue2/dist/index.mjs', '/vue2', req, res);
    if (rendered) return;
  } else if (url.startsWith('/vue3')) {
    const rendered = await renderApp('./my-super-app/ssr-vue3/dist/index.mjs', '/vue3', req, res);
    if (rendered) return;
  } else if (url.startsWith('/ecommerce')) {
    const rendered = await renderApp('./my-super-app/ssr-vue3-ecommerce/dist/index.mjs', '/ecommerce', req, res);
    if (rendered) return;
  } else if (url.startsWith('/admin')) {
    const rendered = await renderApp('./my-super-app/ssr-vue3-admin/dist/index.mjs', '/admin', req, res);
    if (rendered) return;
  }

  let filePath;
  let ext;

  if (url.startsWith('/my-super-app/')) {
    filePath = join(__dirname, url.replace('/my-super-app/', 'my-super-app/'));
    ext = url.match(/\.[^.]+$/)?.[0] || '';
  } else {
    filePath = join(__dirname, 'public', url);
    ext = url.match(/\.[^.]+$/)?.[0] || '';
  }

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

  try {
    const rendered = await renderApp('./my-super-app/ssr-hub/dist/index.mjs', '/', req, res);
    if (!rendered) {
      const indexPath = join(__dirname, 'public/index.html');
      const content = readFileSync(indexPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + error.message);
  }
});

server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║     🚀 ESMX SSR SERVER RUNNING                 ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log('║                                                ║');
  console.log('║  📍 URL: http://localhost:' + PORT + '                ║');
  console.log('║                                                ║');
  console.log('║  🏠 Hub:       /                               ║');
  console.log('║  🌿 Vue 2:     /vue2                           ║');
  console.log('║  💜 Vue 3:     /vue3                           ║');
  console.log('║  🔥 React:     /react                          ║');
  console.log('║  🛒 E-Commerce: /ecommerce                     ║');
  console.log('║  ⚙️  Admin:     /admin                          ║');
  console.log('║  🛑 Press Ctrl+C to stop                       ║');
  console.log('╚════════════════════════════════════════════════╝');
});
