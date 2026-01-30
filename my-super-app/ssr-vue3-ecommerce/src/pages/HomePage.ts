import { h } from 'vue';

export default {
    name: 'HomePage',
    setup() {
        return () => h('div', { class: 'ecommerce-home' }, [
            h('h1', 'E-Commerce Home'),
            h('p', 'Welcome to our store!')
        ]);
    }
};