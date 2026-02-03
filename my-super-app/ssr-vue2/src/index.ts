import Vue from 'vue';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/vue2/about' || path.startsWith('/vue2/about/')) {
    return 'about';
  }
  return 'home';
}

export async function mount(container: HTMLElement) {
  console.log('[Vue2] Mount called with container:', container);

  // Initialize ESMX Router
  const { Router, RouterMode } = await import('@esmx/router');
  const { install } = await import('ssr-npm-vue2');

  const router = new Router({
    mode: RouterMode.history, // Client-side navigation
    routes: [
      { path: '/vue2', component: HomePage },
      { path: '/vue2/about', component: AboutPage }
    ]
  });

  const App = Vue.extend({
    render(h) {
      return h('router-view');
    }
  });

  // Install the router plugin
  if (install) {
    install(Vue, { router });
  }

  console.log('[Vue2] Creating Vue instance...');
  container.innerHTML = '';

  const vm = new Vue({
    el: container,
    render: h => h(App)
  });

  console.log('[Vue2] Mount complete');

  return {
    unmount: () => {
      vm.$destroy();
      if (container) {
        container.innerHTML = '';
      }
      // router.destroy(); // if router supports it
    }
  };
}

export default mount;
