import type { RouteConfig } from '@esmx/router';
import { App } from './index';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

export const routes: RouteConfig[] = [
    {
        path: '/admin',
        component: App,
        app: 'admin',
        children: [
            {
                path: '',
                component: HomePage
            },
            {
                path: 'settings',
                component: SettingsPage
            }
        ]
    }
];
