import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router, RouterMode } from '@esmx/router';
import { RouterProvider, RouterView } from 'ssr-npm-react';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

export function App(props: any) {
  // If router is passed from parent (e.g. Hub), use it. 
  // Otherwise create a new instance (standalone mode).
  const [router] = React.useState(() => {
    if (props.router) return props.router;

    const r = new Router({
      mode: RouterMode.history,
      routes: [
        { path: '/react', component: HomePage },
        { path: '/react/about', component: AboutPage }
      ]
    });

    // In standalone mode (no parent router), we must initialize the first route
    if (typeof window !== 'undefined') {
      r.push(window.location.pathname);
    }

    return r;
  });

  return React.createElement(RouterProvider, {
    router,
    children: React.createElement(RouterView)
  });
}

export function mount(container: HTMLElement, props: any) {
  const root = createRoot(container);

  // Pass props to App (including router if it exists)
  root.render(React.createElement(App, props));

  return {
    unmount: () => {
      root.unmount();
      // If we created a local router instance, we should destroy it?
      // But App component manages the router reference state. 
      // If props.router was passed, we don't own it.
      // If we created it, we might want to destroy it, but RouterProvider doesn't expose it easily out here.
      // Usually fine to leave it for GC or if we want to be strict we can refactor mount to create router outside.
    }
  };
}

export default mount;

export { HomePage, AboutPage };
