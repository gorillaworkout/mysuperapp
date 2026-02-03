import { h } from 'vue';

export default {
    name: 'HomePage',
    setup() {
        return () => h('div', { class: 'ecommerce-home', style: 'padding: 2rem;' }, [
            h('h1', { style: 'color: #f97316; margin-bottom: 1rem;' }, '🛒 E-Commerce Home'),
            h('p', { style: 'margin-bottom: 2rem;' }, 'Welcome to our store!'),
            h('div', { style: 'background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center;' }, [
                h('h3', { style: 'margin: 0 0 1rem 0;' }, '🧭 Multi-Page Navigation'),
                h('p', { style: 'margin: 0 0 1rem 0;' }, 'This E-Commerce app has multiple pages'),
                h('a', { 
                    href: '/ecommerce/about',
                    style: 'display: inline-block; background: white; color: #f97316; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem; font-weight: bold;'
                }, 'Go to About Page →')
            ])
        ]);
    }
};