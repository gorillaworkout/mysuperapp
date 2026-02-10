import { createApp, h, defineComponent, resolveComponent, Router, RouterMode, install } from 'ssr-npm-vue3';
import type { Router as RouterType } from '@esmx/router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

export const App = defineComponent({
  name: 'App',
  render() {
    const RouterView = resolveComponent('router-view');
    return h(RouterView);
  }
});

export async function mount(container: HTMLElement, props?: { router?: RouterType }) {
  const sharedRouter = props?.router;
  const isHubMode = typeof window !== 'undefined' && !!(window as any).__ESMX_HUB_MODE__;
  
  const localRouter: RouterType = new Router({
    mode: isHubMode ? RouterMode.memory : RouterMode.history,
    routes: [
      { path: '/ecommerce', component: HomePage },
      { path: '/ecommerce/about', component: AboutPage }
    ]
  });

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/ecommerce';
  await localRouter.replace(currentPath.startsWith('/ecommerce') ? currentPath : '/ecommerce');

  let unsubscribe: (() => void) | undefined;
  if (sharedRouter && isHubMode) {
    unsubscribe = sharedRouter.afterEach((to: { path: string }) => {
      const currentLocalPath = localRouter.route?.path || '';
      if (to.path.startsWith('/ecommerce') && to.path !== currentLocalPath) {
        localRouter.replace(to.path);
      }
    });
  }

  const app = createApp(App);
  
  if (install) {
    install(app, { router: localRouter, sharedRouter: sharedRouter || undefined });
  }

  container.innerHTML = '';
  const vueContainer = document.createElement('div');
  container.appendChild(vueContainer);
  app.mount(vueContainer);

  return {
    unmount: () => {
      if (unsubscribe) unsubscribe();
      app.unmount();
      if (!sharedRouter) {
        localRouter.destroy();
      }
    }
  };
}

export default mount;
