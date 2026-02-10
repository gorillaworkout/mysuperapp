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

// App routes that should be handled by the SPA
const appRoutes = ['/react', '/vue2', '/vue3', '/ecommerce', '/admin'];

function isAppRoute(url) {
  if (url === '/') return true;
  return appRoutes.some(route => url === route || url.startsWith(route + '/'));
}

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let url = req.url.split('?')[0];

  // Health check endpoint
  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      server: 'ESMX Pre-Mount Server',
      mode: 'zero-delay-navigation'
    }));
    return;
  }

  // Handle static files from my-super-app/
  if (url.startsWith('/my-super-app/')) {
    const filePath = join(__dirname, url.replace('/my-super-app/', 'my-super-app/'));
    const ext = url.match(/\.[^.]+$/)?.[0] || '';
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    if (existsSync(filePath)) {
      try {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(readFileSync(filePath));
        return;
      } catch (error) { 
        console.error('[Static] Error reading file:', error.message);
      }
    }
  }

  // Handle other static assets (favicon, images, etc)
  const ext = url.match(/\.[^.]+$/)?.[0];
  if (ext && mimeTypes[ext]) {
    const publicPath = join(__dirname, 'public', url);
    if (existsSync(publicPath)) {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] });
      res.end(readFileSync(publicPath));
      return;
    }
  }

  // For all app routes, serve the SPA (index.html with pre-mount)
  // This enables zero-delay navigation because all apps are pre-mounted
  if (isAppRoute(url)) {
    try {
      const indexPath = join(__dirname, 'public/index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(readFileSync(indexPath, 'utf-8'));
      return;
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + error.message);
      return;
    }
  }

  // 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found: ' + url);
});

server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║   🚀 ESMX PRE-MOUNT SERVER                         ║');
  console.log('╠════════════════════════════════════════════════════╣');
  console.log('║                                                    ║');
  console.log('║  📍 URL: http://localhost:' + PORT + '                    ║');
  console.log('║                                                    ║');
  console.log('║  ⚡ ZERO-DELAY NAVIGATION MODE                     ║');
  console.log('║  All apps pre-mounted on page load                 ║');
  console.log('║  Navigation = visibility toggle (instant!)         ║');
  console.log('║                                                    ║');
  console.log('║  🏠 Dashboard: /                                   ║');
  console.log('║  🔥 React:     /react                              ║');
  console.log('║  🌿 Vue 2:     /vue2                               ║');
  console.log('║  💜 Vue 3:     /vue3                               ║');
  console.log('║  🛒 E-Commerce: /ecommerce                         ║');
  console.log('║  ⚙️  Admin:     /admin                              ║');
  console.log('║                                                    ║');
  console.log('║  🛑 Press Ctrl+C to stop                           ║');
  console.log('╚════════════════════════════════════════════════════╝');
});
