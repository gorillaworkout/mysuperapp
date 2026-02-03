import { h } from 'vue';

export default {
    name: 'AdminPage',
    setup() {
        return () => h('div', { class: 'admin-home', style: 'padding: 2rem;' }, [
            h('h1', { style: 'color: #4b5563; margin-bottom: 1rem;' }, '⚙️ Admin Dashboard'),
            h('p', { style: 'margin-bottom: 2rem;' }, 'Welcome to the admin panel!'),
            h('div', { style: 'background: linear-gradient(135deg, #4b5563, #374151); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center;' }, [
                h('h3', { style: 'margin: 0 0 1rem 0;' }, '🧭 Multi-Page Navigation'),
                h('p', { style: 'margin: 0 0 1rem 0;' }, 'This Admin app has multiple pages'),
                h('a', { 
                    href: '/admin/settings',
                    style: 'display: inline-block; background: white; color: #4b5563; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem; font-weight: bold;'
                }, 'Go to Settings →')
            ])
        ]);
    }
};