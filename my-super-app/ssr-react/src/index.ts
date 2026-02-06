import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router, RouterMode } from '@esmx/router';
import { RouterProvider, RouterView } from 'ssr-npm-react';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const SharedRouterContext = React.createContext<Router | null>(null);

export function App(props: any) {
  const sharedRouter = props.router || null;
  
  const [localRouter] = React.useState(() => {
    const r = new Router({
      mode: RouterMode.history,
      routes: [
        { path: '/react', component: HomePage },
        { path: '/react/about', component: AboutPage }
      ]
    });

    if (typeof window !== 'undefined') {
      r.push(window.location.pathname);
    }

    return r;
  });

  return React.createElement(SharedRouterContext.Provider, {
    value: sharedRouter,
    children: React.createElement(RouterProvider, {
      router: localRouter,
      children: React.createElement(RouterView)
    })
  });
}

export function mount(container: HTMLElement, props: any) {
  const root = createRoot(container);

  root.render(React.createElement(App, props));

  return {
    unmount: () => {
      root.unmount();
    }
  };
}

export default mount;

export { HomePage, AboutPage };
