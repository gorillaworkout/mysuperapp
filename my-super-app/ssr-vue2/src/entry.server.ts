import Vue from 'vue';
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
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-50 min-h-screen">
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">🚀 ESMX Super App</a>
        <nav class="flex space-x-1">
          <a href="/react" class="font-medium transition-all duration-200 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">React</a>
          <a href="/vue2" class="font-medium transition-all duration-200 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">Vue 2</a>
          <a href="/vue3" class="font-medium transition-all duration-200 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">Vue 3</a>
          <a href="/ecommerce" class="font-medium transition-all duration-200 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">E-Commerce</a>
          <a href="/admin" class="font-medium transition-all duration-200 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50">Admin</a>
        </nav>
      </div>
    </div>
  </header>
  <div id="app">${html}</div>
  <script type="importmap">{
    "imports": {
      "vue": "https://esm.sh/vue@2.7.13?bundle"
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
