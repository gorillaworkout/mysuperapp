import { createApp } from 'ssr-npm-vue3';

export default async function(rc: any) {
    const app = createApp({
        template: '<div class="container"><h1>Admin Dashboard</h1><p>Welcome to the Admin micro-app!</p></div>'
    });

    try {
        const html = '<div class="container"><h1>Admin Dashboard</h1><p>Welcome to the Admin micro-app!</p></div>';
        await rc.commit();

        rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - ESMX</title>
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
      font-weight: 500;
      transition: all 0.2s;
    }
    nav a:hover { color: #2563eb; background: #f3f4f6; }
    .container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1 {
      color: #2563eb;
      margin-bottom: 1rem;
    }
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
  <div id="app">${html}</div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
</body>
</html>`;
        
        console.log('[Admin SSR] Render complete');
    } catch (error) {
        console.error('[Admin SSR] Render error:', error);
        rc.html = `<!DOCTYPE html>
<html>
<head><title>Admin Dashboard - Error</title></head>
<body>
  <div style="padding: 20px; color: red;">SSR Error: ${error instanceof Error ? error.message : 'Unknown error'}</div>
</body>
</html>`;
    }
}