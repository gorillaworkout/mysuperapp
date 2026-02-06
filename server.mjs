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
    "react": "https://esm.sh/react@18.3.1",
    "react-dom": "https://esm.sh/react-dom@18.3.1",
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
  <script src="https://cdn.tailwindcss.com"></script>
  <style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'); body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50 min-h-screen">
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600">🚀 ESMX Super App</a>
        <nav class="flex space-x-1">
          <a href="/react" class="px-4 py-2 text-gray-600 hover:text-blue-600">React</a>
          <a href="/vue2" class="px-4 py-2 text-gray-600 hover:text-blue-600">Vue 2</a>
          <a href="/vue3" class="px-4 py-2 text-gray-600 hover:text-blue-600">Vue 3</a>
          <a href="/ecommerce" class="px-4 py-2 text-gray-600 hover:text-blue-600">E-Commerce</a>
          <a href="/admin" class="px-4 py-2 text-gray-600 hover:text-blue-600">Admin</a>
        </nav>
      </div>
    </div>
  </header>
  <div id="micro-app-mount"></div>
  <script type="importmap">{
    "imports": {
      "react": "https://esm.sh/react@18.3.1",
      "react-dom": "https://esm.sh/react-dom@18.3.1",
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
