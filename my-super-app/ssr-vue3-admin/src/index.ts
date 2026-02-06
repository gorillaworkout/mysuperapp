import { createApp, h, defineComponent, resolveComponent, Router, RouterMode, install } from 'ssr-npm-vue3';
import type { Router as RouterType } from '@esmx/router';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

export const App = defineComponent({
  name: 'App',
  render() {
    const RouterView = resolveComponent('router-view');
    return h(RouterView);
  }
});

export async function mount(container: HTMLElement, props?: { router?: RouterType }) {
  const sharedRouter = props?.router;
  
  const localRouter: RouterType = new Router({
    mode: RouterMode.history,
    routes: [
      { path: '/admin', component: HomePage },
      { path: '/admin/settings', component: SettingsPage }
    ]
  });

  await localRouter.replace(window.location.pathname);

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
      app.unmount();
      if (!sharedRouter) {
        localRouter.destroy();
      }
    }
  };
}

export default mount;
