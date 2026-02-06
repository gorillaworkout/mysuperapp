import { h, resolveComponent } from 'ssr-npm-vue3';

export default {
    name: 'AboutPage',
    render() {
        return h('div', { class: 'ecommerce-about', style: 'padding: 2rem;' }, [
            h('h1', { style: 'color: #f97316; margin-bottom: 1rem;' }, '🛒 About Our Store'),
            h('p', { style: 'margin-bottom: 1rem;' }, 'This is page 2 of the E-Commerce micro-frontend.'),
            h('div', { style: 'background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;' }, [
                h('h3', { style: 'margin-top: 0;' }, '🧭 Navigation'),
                h(resolveComponent('router-link'), { 
                    to: '/',
                    style: 'display: inline-block; background: #6b7280; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem; margin-right: 0.5rem;'
                }, () => '← Dashboard'),
                h(resolveComponent('router-link'), { 
                    to: '/ecommerce',
                    style: 'display: inline-block; background: #f97316; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem;'
                }, () => '← Back to Home')
            ]),
            h('div', { style: 'background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center;' }, [
                h('h3', { style: 'margin: 0 0 0.5rem 0;' }, '🛣️ Route: /ecommerce/about'),
                h('p', { style: 'margin: 0;' }, 'Multi-page routing demo in E-Commerce app')
            ])
        ]);
    }
};
