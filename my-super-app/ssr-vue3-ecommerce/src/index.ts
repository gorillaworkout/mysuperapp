import { createApp, ref, onMounted, onUnmounted, h } from 'vue';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/ecommerce/about' || path.startsWith('/ecommerce/about/')) {
    return 'about';
  }
  return 'home';
}

const App = {
  setup() {
    const currentPage = ref(getCurrentPage());

    const handlePopState = () => {
      currentPage.value = getCurrentPage();
    };

    onMounted(() => {
      window.addEventListener('popstate', handlePopState);
    });

    onUnmounted(() => {
      window.removeEventListener('popstate', handlePopState);
    });

    return { currentPage };
  },
  render() {
    return this.currentPage === 'about' 
      ? h(AboutPage) 
      : h(HomePage);
  }
};

export function mount(container: HTMLElement) {
  const app = createApp(App);
  app.mount(container);
  
  return {
    unmount: () => {
      app.unmount();
    }
  };
}

export default mount;
