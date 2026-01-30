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

const server = createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  let url = req.url === '/' ? '/index.html' : req.url;
  
  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: 'ESMX SSR Server',
      version: '1.0.0'
    }));
    return;
  }
  
  url = url.split('?')[0];
  
  const ext = url.match(/\.[^.]+$/)?.[0] || '';
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  let filePath;
  
  if (url === '/vue2' || url === '/vue2/') {
    filePath = join(__dirname, 'public/vue2.html');
  } else if (url === '/vue3' || url === '/vue3/') {
    filePath = join(__dirname, 'public/vue3.html');
  } else if (url === '/react' || url === '/react/') {
    filePath = join(__dirname, 'public/react.html');
  } else if (url.startsWith('/my-super-app/')) {
    filePath = join(__dirname, url.replace('/my-super-app/', 'my-super-app/'));
  } else {
    filePath = join(__dirname, 'public', url);
  }
  
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
    const indexPath = join(__dirname, 'public/index.html');
    const content = readFileSync(indexPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
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
  console.log('║  🌿 Vue 2:  /vue2                              ║');
  console.log('║  💜 Vue 3:  /vue3                              ║');
  console.log('║  🔥 React:  /react                             ║');
  console.log('║                                                ║');
  console.log('║  🛑 Press Ctrl+C to stop                       ║');
  console.log('╚════════════════════════════════════════════════╝');
});
