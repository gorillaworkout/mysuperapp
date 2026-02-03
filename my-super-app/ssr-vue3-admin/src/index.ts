import { createApp, ref, onMounted, onUnmounted, h } from 'vue';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/admin/settings' || path.startsWith('/admin/settings/')) {
    return 'settings';
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
    return this.currentPage === 'settings' 
      ? h(SettingsPage) 
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
