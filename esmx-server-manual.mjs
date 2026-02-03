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

// Micro-app configurations - Hub Registry
// These apps are registered with the Hub for uniform management
const microApps = {
  '/react': {
    name: 'react',
    title: 'React SSR',
    dir: 'ssr-react',
    framework: 'react',
    ssr: true
  },
  '/vue2': {
    name: 'vue2',
    title: 'Vue 2.7',
    dir: 'ssr-vue2',
    framework: 'vue2',
    ssr: false
  },
  '/vue3': {
    name: 'vue3',
    title: 'Vue 3.3',
    dir: 'ssr-vue3',
    framework: 'vue3',
    ssr: false
  },
  '/ecommerce': {
    name: 'ecommerce',
    title: 'E-Commerce',
    dir: 'ssr-vue3-ecommerce',
    framework: 'vue3',
    ssr: false
  },
  '/admin': {
    name: 'admin',
    title: 'Admin Dashboard',
    dir: 'ssr-vue3-admin',
    framework: 'vue3',
    ssr: false
  }
};

// Hub Registry API
const hubRegistry = {
  apps: microApps,
  
  getAppByPath(path) {
    for (const [route, config] of Object.entries(this.apps)) {
      if (path === route || path.startsWith(route + '/')) {
        return config;
      }
    }
    return null;
  },
  
  getAllApps() {
    return Object.values(this.apps);
  },
  
  isSSRApp(path) {
    const app = this.getAppByPath(path);
    return app ? app.ssr : false;
  }
};

/**
 * Manual SSR rendering by calling server entry directly
 * This bypasses ESMX init() which requires complex manifest setup
 */
async function renderMicroApp(appConfig, url, req, res) {
  try {
    console.log(`[SSR] Rendering ${appConfig.name}...`);
    
    // Find the server entry file (pattern: entry.server.{hash}.final.mjs)
    const { readdirSync } = await import('fs');
    const serverSrcPath = join(__dirname, 'my-super-app', appConfig.dir, 'dist/server/src');
    const files = readdirSync(serverSrcPath);
    const serverEntryFile = files.find(f => f.startsWith('entry.server.') && f.endsWith('.final.mjs'));
    
    if (!serverEntryFile) {
      console.error(`[SSR ERROR] No server entry found in ${serverSrcPath}`);
      return false;
    }
    
    console.log(`[SSR] Loading server entry: ${serverEntryFile}`);
    const serverEntry = await import(join(serverSrcPath, serverEntryFile));
    console.log(`[SSR] Server entry loaded:`, Object.keys(serverEntry));
    
    // Create a mock RenderContext
    const rc = {
      html: '',
      url: url,
      importMetaSet: new Set(),
      files: {
        js: [],
        css: [],
        modulepreload: [],
        resources: []
      },
      async commit() {
        // Mock commit - in real ESMX this collects dependencies
        console.log(`[SSR] Commit called`);
      },
      preload() {
        return ''; // No preloads for now
      },
      css() {
        return ''; // No CSS for now
      },
      importmap() {
        // Return import map for dependencies
        return `<script type="importmap">{
  "imports": {
    "react": "https://esm.sh/react@18.3.1",
    "react-dom": "https://esm.sh/react-dom@18.3.1",
    "vue": "https://esm.sh/vue@${appConfig.framework === 'vue2' ? '2.7' : '3.5'}.13"
  }
}</script>`;
      },
      moduleEntry() {
        // Return client entry script for hydration
        // Note: We can't read files here synchronously in the render context
        // So we'll construct the path based on the known pattern
        const clientSrcPath = `/my-super-app/${appConfig.dir}/dist/client/src`;
        
        // Client bundles follow pattern: entry.client.{hash}.final.mjs
        // For now, return a comment - we'll add this dynamically after render
        return `<!-- Client hydration: ${clientSrcPath}/entry.client.*.final.mjs -->`;
      },
      modulePreload() {
        return '';
      },
      state(varName, data) {
        return `<script>window.${varName} = ${JSON.stringify(data)};</script>`;
      }
    };
    
    // Call the server entry function
    const entryFn = serverEntry.default;
    await entryFn(rc);
    
    console.log(`[SSR] Rendered, HTML length: ${rc.html ? rc.html.length : 0}`);
    
    // Inject client bundle for hydration
    if (rc.html) {
      // Find the actual client entry file (hashed filename)
      const clientSrcPath = join(__dirname, 'my-super-app', appConfig.dir, 'dist/client/src');
      let clientScript = '';
      
      try {
        const clientFiles = readdirSync(clientSrcPath);
        const clientEntryFile = clientFiles.find(f => f.startsWith('entry.client.') && f.endsWith('.final.mjs'));
        
        if (clientEntryFile) {
          clientScript = `<script type="module" src="/my-super-app/${appConfig.dir}/dist/client/src/${clientEntryFile}"></script>`;
          console.log(`[SSR] Client entry found: ${clientEntryFile}`);
        } else {
          console.log(`[SSR] Warning: No client entry file found in ${clientSrcPath}`);
        }
      } catch (err) {
        console.log(`[SSR] Warning: Could not read client directory: ${err.message}`);
      }
      
      if (clientScript) {
        rc.html = rc.html.replace('</body>', `  ${clientScript}\n</body>`);
        console.log(`[SSR] Client hydration script injected`);
      }
    }
    
    console.log(`[SSR] Final HTML length: ${rc.html ? rc.html.length : 0}`);
    
    if (rc.html) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rc.html);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`[SSR ERROR] Failed to render ${appConfig.name}:`, error.message);
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

  // Health check
  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: 'ESMX Manual SSR Server',
      version: '3.0.0'
    }));
    return;
  }

  // Serve static HTML files from public/ directory (before routing)
  const fileExt = url.match(/\.[^.]+$/)?.[0];
  if (fileExt && fileExt === '.html' && url !== '/index.html' && url !== '/') {
    const publicPath = join(__dirname, 'public', url);
    console.log(`[STATIC] Checking: ${url} -> ${publicPath}, exists: ${existsSync(publicPath)}`);
    if (existsSync(publicPath)) {
      try {
        const content = readFileSync(publicPath);
        console.log(`[STATIC] Serving: ${url}`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      } catch (error) {
        console.error('Error reading public HTML:', error);
      }
    }
  }

  // Route to micro-apps using Hub Registry
  const appConfig = hubRegistry.getAppByPath(url);
  if (appConfig && appConfig.ssr) {
    const rendered = await renderMicroApp(appConfig, url, req, res);
    if (rendered) return;
  }

  // Serve static files from public/ directory
  const ext = url.match(/\.[^.]+$/)?.[0];
  if (ext && mimeTypes[ext]) {
    const publicPath = join(__dirname, 'public', url);
    if (existsSync(publicPath)) {
      try {
        const content = readFileSync(publicPath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] });
        res.end(content);
        return;
      } catch (error) {
        console.error('Error reading public file:', error);
      }
    }
  }

  // Serve static files from my-super-app/
  if (url.startsWith('/my-super-app/')) {
    const filePath = join(__dirname, url.replace('/my-super-app/', 'my-super-app/'));
    const ext = url.match(/\.[^.]+$/)?.[0] || '';
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
  }

  // Fallback to client-side routing HTML
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
  console.log('║   🚀 ESMX MANUAL SSR SERVER RUNNING            ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log('║                                                ║');
  console.log('║  📍 URL: http://localhost:' + PORT + '                ║');
  console.log('║                                                ║');
  console.log('║  🏠 Hub:        /                              ║');
  console.log('║  🔥 React:      /react                         ║');
  console.log('║  🌿 Vue 2:      /vue2                          ║');
  console.log('║  💜 Vue 3:      /vue3                          ║');
  console.log('║  🛒 E-Commerce: /ecommerce                     ║');
  console.log('║  ⚙️  Admin:      /admin                         ║');
  console.log('║                                                ║');
  console.log('║  Note: Manual SSR - bypasses ESMX init()      ║');
  console.log('║  🛑 Press Ctrl+C to stop                       ║');
  console.log('╚════════════════════════════════════════════════╝');
});
