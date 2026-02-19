import type { RouteConfig } from '@esmx/router';
import { App } from './index';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

export const routes: RouteConfig[] = [
    {
        path: '/ecommerce',
        component: App,
        app: 'ecommerce',
        children: [
            {
                path: '',
                component: HomePage
            },
            {
                path: 'about',
                component: AboutPage
            }
        ]
    }
];
