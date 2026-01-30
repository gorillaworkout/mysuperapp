import { h } from 'vue';

export default {
    name: 'AdminPage',
    setup() {
        return () => h('div', { class: 'admin-home' }, [
            h('h1', 'Admin Page'),
            h('p', 'Welcome to our admin page!')
        ]);
    }
};