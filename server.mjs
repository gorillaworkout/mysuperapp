import { createServer } from 'http';
import { readFileSync, existsSync, readdirSync } from 'fs';
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
    ssr: true
  },
  '/vue3': {
    name: 'vue3',
    title: 'Vue 3.3',
    dir: 'ssr-vue3',
    framework: 'vue3',
    ssr: true
  },
  '/ecommerce': {
    name: 'ecommerce',
    title: 'E-Commerce',
    dir: 'ssr-vue3-ecommerce',
    framework: 'vue3',
    ssr: true
  },
  '/admin': {
    name: 'admin',
    title: 'Admin Dashboard',
    dir: 'ssr-vue3-admin',
    framework: 'vue3',
    ssr: true
  }
};

const hubRegistry = {
  apps: microApps,

  getAppByPath(path) {
    for (const [route, config] of Object.entries(this.apps)) {
      if (path === route || path.startsWith(route + '/')) {
        return config;
      }
    }
    return null;
  }
};

async function renderMicroApp(appConfig, url, req, res) {
  try {
    const serverSrcPath = join(__dirname, 'my-super-app', appConfig.dir, 'dist/server/src');
    if (!existsSync(serverSrcPath)) return false;

    const files = readdirSync(serverSrcPath);
    const serverEntryFile = files.find(f => f.startsWith('entry.server.') && f.endsWith('.final.mjs'));

    if (!serverEntryFile) return false;

    const serverEntry = await import(join(serverSrcPath, serverEntryFile));

    // Create a mock RenderContext
    const rc = {
      html: '',
      url: url,
      importMetaSet: new Set(),
      files: { js: [], css: [], modulepreload: [], resources: [] },
      async commit() { },
      preload() { return ''; },
      css() { return ''; },
      importmap() {
        return `<script type="importmap">{
  "imports": {
    "react": "/my-super-app/ssr-npm-react/dist/client/react.mjs",
    "react-dom": "/my-super-app/ssr-npm-react/dist/client/react-dom.mjs",
    "react-dom/client": "/my-super-app/ssr-npm-react/dist/client/react-dom/client.mjs",
    "@esmx/router": "/my-super-app/ssr-npm-base/dist/client/@esmx/router/index.mjs",
    "ssr-npm-base": "/my-super-app/ssr-npm-base/dist/client/index.mjs",
    "ssr-npm-react": "/my-super-app/ssr-npm-react/dist/client/src/index.mjs",
    "ssr-npm-vue2": "/my-super-app/ssr-npm-vue2/dist/client/src/index.mjs",
    "ssr-npm-vue3": "/my-super-app/ssr-npm-vue3/dist/client/src/index.mjs"
  },
  "scopes": {
    "/my-super-app/ssr-npm-vue2/": {
      "vue": "/my-super-app/ssr-npm-vue2/dist/client/vue.mjs"
    },
    "/my-super-app/ssr-npm-vue3/": {
      "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs"
    }
  }
}</script>`;
      },
      moduleEntry() {
        return `<!-- Client hydration placeholder -->`;
      },
      modulePreload() { return ''; },
      state(varName, data) {
        return `<script>window.${varName} = ${JSON.stringify(data)};</script>`;
      }
    };

    const entryFn = serverEntry.default;
    await entryFn(rc);

    if (rc.html) {
      const clientSrcPath = join(__dirname, 'my-super-app', appConfig.dir, 'dist/client/src');
      try {
        const clientFiles = readdirSync(clientSrcPath);
        const clientEntryFile = clientFiles.find(f => f.startsWith('entry.client.') && f.endsWith('.final.mjs'));

        if (clientEntryFile) {
          const clientScript = `<script type="module" src="/my-super-app/${appConfig.dir}/dist/client/src/${clientEntryFile}"></script>`;
          rc.html = rc.html.replace('</body>', `  ${clientScript}\n</body>`);
        }
      } catch (err) { }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rc.html);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`[SSR ERROR] ${appConfig.name}:`, error.message);
    return false;
  }
}

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let url = req.url.split('?')[0];

  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', server: 'ESMX SSR Server' }));
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
      } catch (error) { }
    }
  }

  // Handle other static assets (favicon, etc)
  const ext = url.match(/\.[^.]+$/)?.[0];
  if (ext && mimeTypes[ext]) {
    const publicPath = join(__dirname, 'public', url);
    if (existsSync(publicPath)) {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] });
      res.end(readFileSync(publicPath));
      return;
    }
  }

  // Route to micro-apps
  const appConfig = hubRegistry.getAppByPath(url);
  if (appConfig) {
    if (appConfig.ssr) {
      const rendered = await renderMicroApp(appConfig, url, req, res);
      if (rendered) return;
    } else {
      // Client-side app template
      const clientSrcPath = join(__dirname, 'my-super-app', appConfig.dir, 'dist/client/src');
      let clientScript = '';
      try {
        const clientFiles = readdirSync(clientSrcPath);
        const clientEntryFile = clientFiles.find(f => f.startsWith('entry.client.') && f.endsWith('.final.mjs'));
        if (clientEntryFile) {
          clientScript = `<script type="module" src="/my-super-app/${appConfig.dir}/dist/client/src/${clientEntryFile}"></script>`;
        }
      } catch (err) { }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appConfig.title} - ESMX</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      margin: 0;
      min-height: 100vh;
    }
    header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      padding: 0 1rem;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-inner {
      max-width: 80rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }
    nav a {
      padding: 0.5rem 1rem;
      color: #4b5563;
      text-decoration: none;
      border-radius: 0.5rem;
    }
    nav a:hover { color: #2563eb; background: #f3f4f6; }
    .container { max-width: 80rem; margin: 0 auto; padding: 2rem 1rem; }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="/" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.25rem; font-weight: bold; color: #111827; text-decoration: none;">🚀 ESMX Super App</a>
      <nav style="display: flex; gap: 0.25rem;">
        <a href="/react">React</a>
        <a href="/vue2">Vue 2</a>
        <a href="/vue3">Vue 3</a>
        <a href="/ecommerce">E-Commerce</a>
        <a href="/admin">Admin</a>
      </nav>
    </div>
  </header>
  <div id="micro-app-mount" class="container"></div>
  <script type="importmap">{
    "imports": {
      "react": "/my-super-app/ssr-npm-react/dist/client/react.mjs",
      "react-dom": "/my-super-app/ssr-npm-react/dist/client/react-dom.mjs",
      "react-dom/client": "/my-super-app/ssr-npm-react/dist/client/react-dom/client.mjs",
      "@esmx/router": "/my-super-app/ssr-npm-base/dist/client/@esmx/router/index.mjs",
      "ssr-npm-base": "/my-super-app/ssr-npm-base/dist/client/index.mjs",
      "ssr-npm-react": "/my-super-app/ssr-npm-react/dist/client/src/index.mjs",
      "ssr-npm-vue2": "/my-super-app/ssr-npm-vue2/dist/client/src/index.mjs",
      "ssr-npm-vue3": "/my-super-app/ssr-npm-vue3/dist/client/src/index.mjs"
    },
    "scopes": {
      "/my-super-app/ssr-npm-vue2/": {
        "vue": "/my-super-app/ssr-npm-vue2/dist/client/vue.mjs"
      },
      "/my-super-app/ssr-npm-vue3/": {
        "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs"
      }
    }
  }</script>
  ${clientScript}
</body>
</html>`);
      return;
    }
  }

  // Fallback to landing page
  try {
    const indexPath = join(__dirname, 'public/index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(indexPath, 'utf-8'));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + error.message);
  }
});

server.listen(PORT, () => {
  console.log('🚀 Server running on port ' + PORT);
});
