import type { RouteConfig } from '@esmx/router';
import { App } from './index';
import HomePage from './pages/HomePage';

export const routes: RouteConfig[] = [
    {
        path: '/',
        component: App,
        app: 'dashboard',
        children: [
            {
                path: '',
                component: HomePage
            }
        ]
    }
];
