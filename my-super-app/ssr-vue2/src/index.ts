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

export function mount(container: HTMLElement) {
  console.log('[Vue2] Mount called with container:', container);
  let popStateHandler;

  const currentPage = getCurrentPage();
  console.log('[Vue2] Current page:', currentPage);

  const App = Vue.extend({
    data() {
      return {
        currentPage: currentPage
      };
    },
    render(h) {
      console.log('[Vue2] Rendering page:', this.currentPage);
      const pageComponent = this.currentPage === 'about' ? AboutPage : HomePage;
      console.log('[Vue2] Component:', pageComponent?.name || 'unknown');
      return h(pageComponent);
    },
    created() {
      console.log('[Vue2] App created');
      popStateHandler = () => {
        this.currentPage = getCurrentPage();
      };
      window.addEventListener('popstate', popStateHandler);
    },
    mounted() {
      console.log('[Vue2] App mounted to DOM');
    },
    beforeDestroy() {
      window.removeEventListener('popstate', popStateHandler);
    }
  });

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
    }
  };
}

export default mount;
