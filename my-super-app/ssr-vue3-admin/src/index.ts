import { createApp, defineComponent, h, ref } from 'vue';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

export const App = defineComponent({
  name: 'App',
  setup() {
    const currentComponent = ref(HomePage);

    // Simple router logic using @esmx/router
    const updateRoute = async () => {
      const path = window.location.pathname;
      if (path === '/admin/settings' || path.startsWith('/admin/settings/')) {
        currentComponent.value = SettingsPage;
      } else {
        currentComponent.value = HomePage;
      }
    };

    // Initialize route
    updateRoute();

    // Listen to popstate for browser navigation
    window.addEventListener('popstate', updateRoute);

    return { currentComponent };
  },
  render() {
    return h(this.currentComponent);
  }
});

export async function mount(container: HTMLElement) {
  // Import router for programmatic navigation
  const { Router, RouterMode } = await import('@esmx/router');

  const router = new Router({
    root: container,
    mode: RouterMode.history,
    routes: [
      { path: '/admin', component: HomePage },
      { path: '/admin/settings', component: SettingsPage }
    ]
  });

  const app = createApp(App);
  app.config.globalProperties.$router = router;

  app.mount(container);

  // Navigate to current URL to activate the route
  await router.replace(window.location.pathname);

  return {
    unmount: () => {
      app.unmount();
      router.destroy();
    }
  };
}

export default mount;
