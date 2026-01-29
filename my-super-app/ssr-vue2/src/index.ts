import Vue from 'vue';
import { install as RouterInstall } from '@esmx/router-vue';
import { HomePage } from './pages/HomePage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { Router } from '@esmx/router';
import { EsmxOptions } from '@esmx/core';

const router = Router.getInstance();

router.addRoute('/vue2', { component: HomePage });
router.addRoute('/vue2/products', { component: ProductsPage });
router.addRoute('/vue2/dashboard', { component: DashboardPage });

export default function createVue2App(): Vue {
  RouterInstall(Vue);
  
  return new Vue({
    render: h => h(HomePage)
  });
}

export const routes = {
  '/vue2': HomePage,
  '/vue2/products': ProductsPage,
  '/vue2/dashboard': DashboardPage
};