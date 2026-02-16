import { Router, RouterMode } from '@esmx/router';
import { mount } from './index';

const container = document.getElementById('micro-app-mount');
if (container) {
  const router = new Router({
    mode: RouterMode.history,
    routes: [
      { path: '/ecommerce', component: null },
      { path: '/ecommerce/about', component: null }
    ]
  });
  router.replace(window.location.pathname);
  mount(container, { router });
}

export { createApp, mount, default } from './index';
