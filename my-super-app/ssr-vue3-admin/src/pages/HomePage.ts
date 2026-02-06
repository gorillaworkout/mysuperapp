import { h, resolveComponent } from 'ssr-npm-vue3';

export default {
    name: 'HomePage',
    render() {
        return h('div', { class: 'admin-home', style: 'padding: 2rem;' }, [
            h('h1', { style: 'color: #4b5563; margin-bottom: 1rem;' }, '⚙️ Admin Dashboard'),
            h('p', { style: 'margin-bottom: 2rem;' }, 'Welcome to the admin panel!'),
            h('div', { style: 'background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;' }, [
                h('h3', { style: 'margin-top: 0;' }, '🧭 Navigation'),
                h(resolveComponent('router-link'), { 
                    to: '/',
                    style: 'display: inline-block; background: #6b7280; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem; margin-right: 0.5rem;'
                }, () => '← Dashboard'),
                h(resolveComponent('router-link'), { 
                    to: '/admin/settings',
                    style: 'display: inline-block; background: #4b5563; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem;'
                }, () => 'Go to Settings →')
            ]),
            h('div', { style: 'background: linear-gradient(135deg, #4b5563, #374151); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center;' }, [
                h('h3', { style: 'margin: 0 0 0.5rem 0;' }, '🛣️ Route: /admin'),
                h('p', { style: 'margin: 0;' }, 'Multi-page routing demo in Admin app')
            ])
        ]);
    }
};
