import { createApp as createVueApp, h, defineComponent } from 'ssr-npm-vue3';
import { RouterPlugin, useProvideRouter, useRoute } from 'ssr-npm-vue3';
import type { Router } from '@esmx/router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const routes: Record<string, any> = {
  '/vue3': HomePage,
  '/vue3/about': AboutPage
};

const AppView = defineComponent({
  name: 'AppView',
  setup() {
    const route = useRoute();
    return () => {
      const path = route?.path || '/vue3';
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

function createRootComponent(router: Router) {
  return defineComponent({
    name: 'Root',
    setup() {
      useProvideRouter(router);
      return () => h(App);
    }
  });
}

export function createApp(router: Router) {
  let app: ReturnType<typeof createVueApp> | null = null;
  let vueContainer: HTMLDivElement | null = null;

  return {
    mount(el: HTMLElement) {
      vueContainer = document.createElement('div');
      el.appendChild(vueContainer);
      app = createVueApp(createRootComponent(router));
      app.use(RouterPlugin);
      app.mount(vueContainer);
    },
    unmount() {
      app?.unmount();
      app = null;
      vueContainer?.remove();
      vueContainer = null;
    }
  };
}

export async function mount(container: HTMLElement, props?: { router?: Router }) {
  container.innerHTML = '';
  const vueContainer = document.createElement('div');
  container.appendChild(vueContainer);
  const app = createVueApp(createRootComponent(props?.router!));
  app.use(RouterPlugin);
  app.mount(vueContainer);

  return {
    unmount: () => {
      app.unmount();
    }
  };
}

export default mount;
