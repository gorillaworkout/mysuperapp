import { h, resolveComponent, defineComponent } from 'ssr-npm-vue3';
import { useRouter } from 'ssr-npm-vue3';

export default defineComponent({
    name: 'HomePage',
    setup() {
        const router = useRouter();
        const navLink = (to: string, style: string, label: string) => {
            return h('a', {
                href: to,
                style,
                onClick: (e: Event) => {
                    const me = e as MouseEvent;
                    if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
                    e.preventDefault();
                    router.push(to);
                }
            }, label);
        };
        return { navLink };
    },
    render() {
        return h('div', { class: 'ecommerce-home', style: 'padding: 2rem;' }, [
            h('h1', { style: 'color: #f97316; margin-bottom: 1rem;' }, '🛒 E-Commerce Home'),
            h('p', { style: 'margin-bottom: 2rem;' }, 'Welcome to our store!'),
            h('div', { style: 'background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;' }, [
                h('h3', { style: 'margin-top: 0;' }, '🧭 Navigation'),
                this.navLink('/', 'display: inline-block; background: #6b7280; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem; margin-right: 0.5rem;', '← Dashboard'),
                this.navLink('/ecommerce/about', 'display: inline-block; background: #f97316; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 0.25rem;', 'Go to About →')
            ]),
            h('div', { style: 'background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center;' }, [
                h('h3', { style: 'margin: 0 0 0.5rem 0;' }, '🛣️ Route: /ecommerce'),
                h('p', { style: 'margin: 0;' }, 'Multi-page routing demo in E-Commerce app')
            ])
        ]);
    }
});
