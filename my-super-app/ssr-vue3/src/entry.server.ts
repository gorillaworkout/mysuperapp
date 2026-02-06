import { createSSRApp, h, defineComponent, resolveComponent } from 'ssr-npm-vue3';

const App = defineComponent({
  name: 'App',
  render() {
    const RouterView = resolveComponent('router-view');
    return h(RouterView);
  }
});

export default async function server(ctx: any) {
    const app = createSSRApp({
        render: () => h(App)
    });

    // For now, we'll render a simple HTML like the ecommerce version
    // Later we can add router functionality when the imports are properly resolved
    const html = '<div>Hello Vue 3 SSR!</div>';
    
    ctx.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3.3 - ESMX</title>
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
  ${ctx.importmap()}
  ${ctx.moduleEntry()}
</body>
</html>`;
    
    console.log('[Vue3 SSR] Render complete');
}