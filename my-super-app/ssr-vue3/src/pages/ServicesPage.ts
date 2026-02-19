import { useRouter } from '@esmx/router-vue';
import { defineComponent, h } from 'vue';

const styles = {
    container: {
        minHeight: '100vh',
        background:
            'linear-gradient(to bottom right, #faf5ff, #f5f3ff, #ede9fe)',
        padding: '2rem'
    },
    card: {
        maxWidth: '56rem',
        margin: '0 auto',
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow:
            '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        padding: '2rem'
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '2rem'
    },
    title: {
        fontSize: '2.25rem',
        fontWeight: '700',
        color: '#7c3aed',
        marginBottom: '0.5rem'
    },
    subtitle: {
        fontSize: '1.125rem',
        color: '#4b5563'
    },
    navSection: {
        marginBottom: '2rem',
        padding: '1rem',
        background: '#f9fafb',
        borderRadius: '0.5rem'
    },
    navTitle: {
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.75rem'
    },
    navButtons: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap' as const,
        alignItems: 'center'
    },
    buttonGray: {
        background: '#6b7280',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    buttonPurple: {
        background: '#7c3aed',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    separator: {
        color: '#9ca3af',
        alignSelf: 'center'
    },
    currentPage: {
        color: '#4b5563',
        alignSelf: 'center'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem'
    },
    serviceBox: {
        background: '#faf5ff',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #8b5cf6'
    },
    techBox: {
        background: '#ede9fe',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #7c3aed'
    },
    boxTitle: {
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.5rem'
    },
    boxDesc: {
        fontSize: '0.875rem',
        color: '#4b5563'
    },
    list: {
        fontSize: '0.875rem',
        color: '#4b5563',
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        marginBottom: '0.25rem'
    },
    footer: {
        background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        textAlign: 'center' as const
    },
    footerTitle: {
        fontWeight: '600',
        marginBottom: '0.5rem'
    },
    footerDesc: {
        fontSize: '0.875rem'
    }
};

export const ServicesPage = defineComponent({
    name: 'Vue3ServicesPage',
    setup() {
        const router = useRouter();
        const navLink = (to: string, style: any, label: string) => {
            return h(
                'a',
                {
                    href: to,
                    style,
                    onClick: (e: Event) => {
                        const me = e as MouseEvent;
                        if (
                            me.metaKey ||
                            me.ctrlKey ||
                            me.shiftKey ||
                            me.altKey
                        )
                            return;
                        e.preventDefault();
                        router.push(to);
                    }
                },
                label
            );
        };
        return { navLink };
    },
    render() {
        return h('div', { style: styles.container }, [
            h('div', { style: styles.card }, [
                h('div', { style: styles.header }, [
                    h('h1', { style: styles.title }, '🛠️ Vue 3 Services'),
                    h(
                        'p',
                        { style: styles.subtitle },
                        'Services powered by Vue 3'
                    )
                ]),

                h('div', { style: styles.navSection }, [
                    h('h3', { style: styles.navTitle }, '🧭 Navigation'),
                    h('div', { style: styles.navButtons }, [
                        this.navLink('/', styles.buttonGray, '← Dashboard'),
                        this.navLink('/vue3', styles.buttonPurple, '← Home'),
                        h('span', { style: styles.separator }, '|'),
                        h(
                            'span',
                            { style: styles.currentPage },
                            'Current: Services Page'
                        )
                    ])
                ]),

                h('div', { style: styles.grid }, [
                    h('div', { style: styles.serviceBox }, [
                        h(
                            'h3',
                            { style: styles.boxTitle },
                            '🚀 Available Services'
                        ),
                        h('ul', { style: styles.list }, [
                            h(
                                'li',
                                { style: styles.listItem },
                                '• API Gateway'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Authentication'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Data Pipeline'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Real-time Events'
                            )
                        ])
                    ]),
                    h('div', { style: styles.techBox }, [
                        h('h3', { style: styles.boxTitle }, '⚙️ Technology'),
                        h('ul', { style: styles.list }, [
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Vue 3 Composition API'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• TypeScript 5'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• ESMX Federation'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Micro-Frontend Architecture'
                            )
                        ])
                    ])
                ]),

                h('div', { style: styles.footer }, [
                    h(
                        'h3',
                        { style: styles.footerTitle },
                        '🛣️ Route: /vue3/services'
                    ),
                    h(
                        'p',
                        { style: styles.footerDesc },
                        'Services page of the Vue 3 micro-frontend'
                    )
                ])
            ])
        ]);
    }
});

export default ServicesPage;
