import { useRouter } from '@esmx/router-vue';
import { defineComponent, h } from 'vue';

const apps = [
    {
        path: '/react',
        label: 'React App',
        icon: '⚛️',
        color: '#3b82f6',
        desc: 'React 18 + SSR'
    },
    {
        path: '/blog',
        label: 'React Blog',
        icon: '📝',
        color: '#8b5cf6',
        desc: 'React 18 Blog'
    },
    {
        path: '/vue3',
        label: 'Vue 3 App',
        icon: '💚',
        color: '#22c55e',
        desc: 'Vue 3.5 + SSR'
    },
    {
        path: '/vue2',
        label: 'Vue 2 App',
        icon: '🟢',
        color: '#10b981',
        desc: 'Vue 2.7 + SSR'
    },
    {
        path: '/ecommerce',
        label: 'E-Commerce',
        icon: '🛒',
        color: '#f97316',
        desc: 'Vue 3 Store'
    },
    {
        path: '/admin',
        label: 'Admin Panel',
        icon: '🛠️',
        color: '#ef4444',
        desc: 'Vue 3 Dashboard'
    }
];

const cardStyle =
    'display: block; background: white; border-radius: 0.75rem; padding: 1.5rem; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 2px solid transparent; transition: all 0.2s; cursor: pointer;';

export default defineComponent({
    name: 'HomePage',
    setup() {
        const router = useRouter();

        const navigate = (e: Event, path: string) => {
            const me = e as MouseEvent;
            if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
            e.preventDefault();
            router.push(path);
        };

        return { navigate };
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
                                            style: 'font-size: 2rem; margin-bottom: 0.75rem;'
                                        },
                                        app.icon
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
                                'Zero-bundler federation • Multi-framework SSR • TypeScript'
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
                                    '@esmx/router'
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
