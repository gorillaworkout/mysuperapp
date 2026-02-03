import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainLayout } from './layout/MainLayout.tsx';
import { Router, RouterMode } from '@esmx/router';
import { createHub } from './hub';
import { microAppConfigs } from './appConfigs.ts';

const router = new Router({
  root: '#app',
  mode: RouterMode.history,
  routes: [
    { path: '/', component: () => null },
    { path: '/react', component: () => null },
    { path: '/vue2', component: () => null },
    { path: '/vue3', component: () => null },
    { path: '/ecommerce', component: () => null },
    { path: '/admin', component: () => null }
  ]
});

const hub = createHub(router, {
  defaultContainer: '#app',
  enableSSR: true
});

hub.registerMultiple(microAppConfigs);

export function App() {
  return React.createElement(MainLayout, { hub });
}

if (typeof window !== 'undefined') {
  const container = document.getElementById('app');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App));
  }
}

export default App;
