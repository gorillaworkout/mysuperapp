import type { RouteConfig } from '@esmx/router';
import { App } from './index';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';

export const routes: RouteConfig[] = [
    {
        path: '/blog',
        component: App,
        app: 'blog',
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
