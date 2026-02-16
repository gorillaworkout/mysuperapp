import Vue, { defineComponent, h, RouterPlugin, useProvideRouter, useRoute } from 'ssr-npm-vue2';
import type { Router as RouterType } from '@esmx/router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const routes: Record<string, any> = {
  '/vue2': HomePage,
  '/vue2/about': AboutPage
};

const AppView = defineComponent({
  name: 'AppView',
  setup() {
    const route = useRoute();
    return () => {
      const path = route?.path || '/vue2';
      const Component = routes[path] || HomePage;
      return h(Component);
    };
  }
});

export const App = defineComponent({
  name: 'App',
  setup() {
    return () => h(AppView);
  }
});

function createRootComponent(router: RouterType) {
  return defineComponent({
    name: 'Root',
    setup() {
      useProvideRouter(router);
      return () => h(App);
    }
  });
}

export function createApp(router: RouterType) {
  let vm: any = null;
  let vueContainer: HTMLDivElement | null = null;

  return {
    mount(el: HTMLElement) {
      vueContainer = document.createElement('div');
      el.appendChild(vueContainer);

      Vue.use(RouterPlugin);

      vm = new Vue({
        router,
        render: (h: any) => h(createRootComponent(router))
      } as any);
      vm.$mount(vueContainer);
    },
    unmount() {
      if (vm) {
        vm.$el?.remove();
        vm.$destroy();
        vm = null;
      }
      vueContainer = null;
    }
  };
}

export async function mount(el: HTMLElement, props?: { router?: RouterType }) {
  const vueContainer = document.createElement('div');
  el.appendChild(vueContainer);

  Vue.use(RouterPlugin);

  const vm = new Vue({
    router: props?.router!,
    render: (h: any) => h(createRootComponent(props?.router!))
  } as any);
  vm.$mount(vueContainer);

  return {
    unmount: () => {
      vm.$destroy();
    }
  };
}

export default mount;
