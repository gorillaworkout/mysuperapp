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
  let popStateHandler;

  const App = Vue.extend({
    data() {
      return {
        currentPage: getCurrentPage()
      };
    },
    render(h) {
      return h(this.currentPage === 'about' ? AboutPage : HomePage);
    },
    created() {
      popStateHandler = () => {
        this.currentPage = getCurrentPage();
      };
      window.addEventListener('popstate', popStateHandler);
    },
    beforeDestroy() {
      window.removeEventListener('popstate', popStateHandler);
    }
  });

  const vm = new Vue({
    el: container,
    render: h => h(App)
  });
  
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
