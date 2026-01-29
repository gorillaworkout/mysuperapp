import { createApp } from 'vue';
import { install as RouterInstall } from '@esmx/router-vue';
import { HomePage } from './pages/HomePage.js';
import { ServicesPage } from './pages/ServicesPage.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { Router } from '@esmx/router';

const router = Router.getInstance();

router.addRoute('/vue3', { component: HomePage });
router.addRoute('/vue3/services', { component: ServicesPage });
router.addRoute('/vue3/settings', { component: SettingsPage });

export default function createVue3App() {
  const app = createApp(HomePage);
  RouterInstall(app);
  return app;
}

export const routes = {
  '/vue3': HomePage,
  '/vue3/services': ServicesPage,
  '/vue3/settings': SettingsPage
};