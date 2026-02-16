import {
  React,
  RouterProvider,
  useRoute
} from 'ssr-npm-react';
import { createRoot } from 'react-dom/client';
import type { Router } from '@esmx/router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const routes: Record<string, React.ComponentType> = {
  '/blog': HomePage,
  '/blog/about': AboutPage
};

function AppView() {
  const currentRoute = useRoute();
  if (!currentRoute) return null;

  const Component = routes[currentRoute.path] || HomePage;
  return React.createElement(Component);
}

export function App({ router }: { router: Router }) {
  return React.createElement(
    RouterProvider,
    { router, children: React.createElement(AppView) }
  );
}

export function createApp(router: Router) {
  let root: ReturnType<typeof createRoot> | null = null;
  let reactContainer: HTMLDivElement | null = null;

  return {
    mount(el: HTMLElement) {
      reactContainer = document.createElement('div');
      el.appendChild(reactContainer);
      root = createRoot(reactContainer);
      root.render(React.createElement(App, { router }));
    },
    unmount() {
      root?.unmount();
      root = null;
      reactContainer?.remove();
      reactContainer = null;
    }
  };
}

export function mount(container: HTMLElement, props?: { router?: Router }) {
  const root = createRoot(container);
  root.render(React.createElement(App, { router: props?.router! }));

  return {
    unmount: () => {
      root.unmount();
    }
  };
}

export default mount;
export { HomePage, AboutPage };
