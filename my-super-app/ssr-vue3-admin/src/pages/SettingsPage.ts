import { h } from 'vue';

export default {
    name: 'SettingsPage',
    setup() {
        return () => h('div', { class: 'admin-settings', style: 'padding: 2rem;' }, [
            h('h1', { style: 'color: #4b5563; margin-bottom: 1rem;' }, '⚙️ Admin Settings'),
            h('p', { style: 'margin-bottom: 1rem;' }, 'This is page 2 of the Admin micro-frontend.'),
            h('div', { style: 'background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;' }, [
                h('h3', { style: 'margin-top: 0;' }, '🧭 Navigation'),
                h('a', { 
                    href: '/admin',
                    style: 'display: inline-block; background: #4b5563; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem;'
                }, '← Back to Dashboard')
            ]),
            h('div', { style: 'background: linear-gradient(135deg, #4b5563, #374151); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center;' }, [
                h('h3', { style: 'margin: 0 0 0.5rem 0;' }, '🛣️ Route: /admin/settings'),
                h('p', { style: 'margin: 0;' }, 'Multi-page routing demo in Admin app')
            ])
        ]);
    }
};
