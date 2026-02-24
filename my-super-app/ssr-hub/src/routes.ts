import type { RouteConfig } from '@esmx/router';
import { routes as reactRoutes } from 'ssr-react/src/routes';
import { routes as vue2Routes } from 'ssr-vue2/src/routes';
import { routes as vue3Routes } from 'ssr-vue3/src/routes';
import { routes as dashboardRoutes } from 'ssr-vue3-dashboard/src/routes';

export const routes: RouteConfig[] = [
    ...dashboardRoutes,
    ...reactRoutes,
    ...vue2Routes,
    ...vue3Routes
];
