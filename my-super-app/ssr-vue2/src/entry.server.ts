import Vue from 'ssr-npm-vue2';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

// @ts-ignore - vue-server-renderer doesn't have types
import { createRenderer } from 'vue-server-renderer';

const renderer = createRenderer();

export default async function(rc: any) {
  const url = rc.req?.url || '/';
  const isAboutPage = url.includes('/about');
  
  console.log('[Vue2 SSR] Rendering page:', isAboutPage ? 'about' : 'home');
  
  const App = Vue.extend({
    render(h) {
      const PageComponent = isAboutPage ? AboutPage : HomePage;
      return h(PageComponent);
    }
  });
  
  const app = new Vue({
    render: h => h(App)
  });
  
  try {
    const html = await renderer.renderToString(app);
    await rc.commit();
    
    rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 2.7 - ESMX</title>
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
  <div id="app" class="container">${html}</div>
  <script type="importmap">{
    "imports": {
      "vue": "/my-super-app/ssr-npm-vue2/dist/client/vue.mjs"
    }
  }</script>
  ${rc.moduleEntry()}
</body>
</html>`;
    
    console.log('[Vue2 SSR] Render complete');
  } catch (error) {
    console.error('[Vue2 SSR] Render error:', error);
    rc.html = `<!DOCTYPE html>
<html>
<head><title>Vue 2.7 - Error</title></head>
<body>
  <div style="padding: 20px; color: red;">SSR Error: ${error.message}</div>
</body>
</html>`;
  }
}
