import { useRouter } from '@esmx/router-vue';
import type { Ref } from 'vue';
import { computed, defineComponent, h } from 'vue';
import { useAppStore } from 'ssr-npm-vue3/src/store-plugin';
import type { CartItem, Notification } from 'ssr-share/src/store';

const apps = [
    {
        path: '/react',
        label: 'React App',
        icon: '⚛️',
        color: '#3b82f6',
        desc: 'React 18 + SSR',
        storeKey: null
    },
    {
        path: '/blog',
        label: 'React Blog',
        icon: '📝',
        color: '#8b5cf6',
        desc: 'React 18 Blog',
        storeKey: null
    },
    {
        path: '/vue3',
        label: 'Vue 3 App',
        icon: '💚',
        color: '#22c55e',
        desc: 'Vue 3.5 + SSR',
        storeKey: null
    },
    {
        path: '/vue2',
        label: 'Vue 2 App',
        icon: '🟢',
        color: '#10b981',
        desc: 'Vue 2.7 + SSR',
        storeKey: null
    },
    {
        path: '/ecommerce',
        label: 'E-Commerce',
        icon: '🛒',
        color: '#f97316',
        desc: 'Vue 3 Store',
        storeKey: 'cart'
    },
    {
        path: '/admin',
        label: 'Admin Panel',
        icon: '🛠️',
        color: '#ef4444',
        desc: 'Vue 3 Dashboard',
        storeKey: null
    }
];

const cardStyle =
    'display: block; background: white; border-radius: 0.75rem; padding: 1.5rem; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 2px solid transparent; transition: all 0.2s; cursor: pointer;';

export default defineComponent({
    name: 'HomePage',
    setup() {
        const router = useRouter();
        const store = useAppStore();

        const cartItems = store.cartItems as Ref<CartItem[]>;
        const cartTotal = store.cartTotal as Ref<number>;
        const notifications = store.notifications as Ref<Notification[]>;
        const unreadCount = store.unreadCount as Ref<number>;

        const cartCount = computed(() =>
            cartItems.value.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
        );

        const navigate = (e: Event, path: string) => {
            const me = e as MouseEvent;
            if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
            e.preventDefault();
            router.push(path);
        };

        return { navigate, cartItems, cartTotal, notifications, unreadCount, cartCount };
    },
    render() {
        return h(
            'div',
            {
                style: 'min-height: 100vh; background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf2f8 100%); padding: 2rem;'
            },
            [
                h('div', { style: 'max-width: 56rem; margin: 0 auto;' }, [
                    h(
                        'div',
                        { style: 'text-align: center; margin-bottom: 2.5rem;' },
                        [
                            h(
                                'h1',
                                {
                                    style: 'font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem;'
                                },
                                '🚀 ESMX Super App'
                            ),
                            h(
                                'p',
                                {
                                    style: 'font-size: 1.125rem; color: #6b7280;'
                                },
                                'Multi-framework micro-frontend architecture with SSR'
                            ),
                            h(
                                'div',
                                {
                                    style: 'margin-top: 1rem; display: inline-flex; gap: 0.5rem;'
                                },
                                ['React 18', 'Vue 3.5', 'Vue 2.7', 'SSR'].map(
                                    (tag, i) =>
                                        h(
                                            'span',
                                            {
                                                style:
                                                    [
                                                        'background: #dbeafe; color: #1e40af;',
                                                        'background: #dcfce7; color: #166534;',
                                                        'background: #d1fae5; color: #065f46;',
                                                        'background: #f3e8ff; color: #6b21a8;'
                                                    ][i] +
                                                    ' padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;'
                                            },
                                            tag
                                        )
                                )
                            )
                        ]
                    ),
                    // Store status bar
                    h(
                        'div',
                        {
                            style: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;'
                        },
                        [
                            h(
                                'div',
                                {
                                    style: 'background: white; border-radius: 0.75rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #f97316; text-align: center;'
                                },
                                [
                                    h('div', { style: 'font-size: 2rem;' }, '🛒'),
                                    h(
                                        'div',
                                        {
                                            style: 'font-size: 1.75rem; font-weight: 800; color: #f97316;'
                                        },
                                        String(this.cartCount)
                                    ),
                                    h(
                                        'div',
                                        { style: 'font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;' },
                                        `Cart Items · $${this.cartTotal.toFixed(2)}`
                                    )
                                ]
                            ),
                            h(
                                'div',
                                {
                                    style: 'background: white; border-radius: 0.75rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #ef4444; text-align: center;'
                                },
                                [
                                    h('div', { style: 'font-size: 2rem;' }, '🔔'),
                                    h(
                                        'div',
                                        {
                                            style: 'font-size: 1.75rem; font-weight: 800; color: #ef4444;'
                                        },
                                        String(this.unreadCount)
                                    ),
                                    h(
                                        'div',
                                        { style: 'font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;' },
                                        `Unread · ${this.notifications.length} total`
                                    )
                                ]
                            ),
                            h(
                                'div',
                                {
                                    style: 'background: white; border-radius: 0.75rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #22c55e; text-align: center;'
                                },
                                [
                                    h('div', { style: 'font-size: 2rem;' }, '🔗'),
                                    h(
                                        'div',
                                        {
                                            style: 'font-size: 1.75rem; font-weight: 800; color: #22c55e;'
                                        },
                                        'Live'
                                    ),
                                    h(
                                        'div',
                                        { style: 'font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;' },
                                        'Shared State Active'
                                    )
                                ]
                            )
                        ]
                    ),
                    h(
                        'div',
                        {
                            style: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem;'
                        },
                        apps.map((app) =>
                            h(
                                'a',
                                {
                                    href: app.path,
                                    style: cardStyle,
                                    onClick: (e: Event) =>
                                        this.navigate(e, app.path)
                                },
                                [
                                    h(
                                        'div',
                                        {
                                            style: 'display: flex; justify-content: space-between; align-items: flex-start;'
                                        },
                                        [
                                            h(
                                                'div',
                                                {
                                                    style: 'font-size: 2rem; margin-bottom: 0.75rem;'
                                                },
                                                app.icon
                                            ),
                                            // Show cart badge on ecommerce card
                                            ...(app.storeKey === 'cart' && this.cartCount > 0
                                                ? [
                                                      h(
                                                          'span',
                                                          {
                                                              style: 'background: #ef4444; color: white; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px; min-width: 1.25rem; text-align: center;'
                                                          },
                                                          String(this.cartCount)
                                                      )
                                                  ]
                                                : [])
                                        ]
                                    ),
                                    h(
                                        'h3',
                                        {
                                            style: `font-size: 1.125rem; font-weight: 700; color: ${app.color}; margin: 0 0 0.25rem 0;`
                                        },
                                        app.label
                                    ),
                                    h(
                                        'p',
                                        {
                                            style: 'font-size: 0.875rem; color: #6b7280; margin: 0;'
                                        },
                                        app.desc
                                    )
                                ]
                            )
                        )
                    ),
                    h(
                        'div',
                        {
                            style: 'background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 2rem; border-radius: 0.75rem; text-align: center;'
                        },
                        [
                            h(
                                'h3',
                                {
                                    style: 'font-weight: 700; margin: 0 0 0.5rem 0; font-size: 1.25rem;'
                                },
                                '⚡ Powered by ESMX v3'
                            ),
                            h(
                                'p',
                                {
                                    style: 'margin: 0 0 1rem 0; font-size: 0.875rem; opacity: 0.9;'
                                },
                                'Zero-bundler federation • Multi-framework SSR • Shared State'
                            ),
                            h(
                                'div',
                                {
                                    style: 'display: flex; justify-content: center; gap: 0.75rem; font-size: 0.75rem;'
                                },
                                [
                                    '6 Micro Apps',
                                    '3 Frameworks',
                                    'Full SSR',
                                    'Cross-App State'
                                ].map((tag) =>
                                    h(
                                        'span',
                                        {
                                            style: 'background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 0.25rem;'
                                        },
                                        tag
                                    )
                                )
                            )
                        ]
                    )
                ])
            ]
        );
    }
});
