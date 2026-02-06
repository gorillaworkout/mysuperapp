import Vue, { Router, RouterMode, install } from 'ssr-npm-vue2';
import type { Router as RouterType } from '@esmx/router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

export async function mount(container: HTMLElement, props?: { router?: RouterType }) {
  console.log('[Vue2] Mount called with container:', container);

  const sharedRouter = props?.router;

  const localRouter = new Router({
    mode: RouterMode.history,
    routes: [
      { path: '/vue2', component: HomePage },
      { path: '/vue2/about', component: AboutPage }
    ]
  });

  await localRouter.replace(window.location.pathname);

  const App = Vue.extend({
    render(h) {
      return h('router-view');
    }
  });

  if (install) {
    install(Vue, { router: localRouter, sharedRouter: sharedRouter || undefined });
  }

  console.log('[Vue2] Creating Vue instance...');
  container.innerHTML = '';

  const vueContainer = document.createElement('div');
  container.appendChild(vueContainer);

  const vm = new Vue({
    router: localRouter,
    render: (h: any) => h(App)
  } as any);
  
  vm.$mount(vueContainer);

  console.log('[Vue2] Mount complete');

  return {
    unmount: () => {
      vm.$destroy();
      if (container) {
        container.innerHTML = '';
      }
      if (!sharedRouter) {
        localRouter.destroy();
      }
    }
  };
}

export default mount;
