import { React, Router, RouterMode } from 'ssr-npm-react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './index';

const container = document.getElementById('micro-app-mount');
if (container) {
  const router = new Router({
    mode: RouterMode.history,
    routes: [
      { path: '/blog', component: null },
      { path: '/blog/about', component: null }
    ]
  });
  router.replace(window.location.pathname);

  try {
    hydrateRoot(container, React.createElement(App, { router }));
  } catch {
    const root = createRoot(container);
    root.render(React.createElement(App, { router }));
  }
}

export { createApp, mount, default } from './index';
