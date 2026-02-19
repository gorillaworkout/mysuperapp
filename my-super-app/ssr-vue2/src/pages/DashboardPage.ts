import Vue from 'vue';

const styles = {
    container: {
        minHeight: '100vh',
        background:
            'linear-gradient(to bottom right, #ecfdf5, #f0fdfa, #ecfeff)',
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
        color: '#0891b2',
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
    buttonCyan: {
        background: '#0891b2',
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
    statsBox: {
        background: '#ecfdf5',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #10b981'
    },
    metricsBox: {
        background: '#f0fdfa',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #14b8a6'
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
        background: 'linear-gradient(to right, #0891b2, #0d9488)',
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

export const DashboardPage = Vue.extend({
    name: 'Vue2DashboardPage',
    render(h) {
        return h('div', { style: styles.container }, [
            h('div', { style: styles.card }, [
                h('div', { style: styles.header }, [
                    h('h1', { style: styles.title }, '📊 Vue 2 Dashboard'),
                    h(
                        'p',
                        { style: styles.subtitle },
                        'Analytics dashboard built with Vue 2'
                    )
                ]),

                h('div', { style: styles.navSection }, [
                    h('h3', { style: styles.navTitle }, '🧭 Navigation'),
                    h('div', { style: styles.navButtons }, [
                        h(
                            'a',
                            {
                                attrs: { href: '/' },
                                style: styles.buttonGray,
                                on: {
                                    click: (e: MouseEvent) => {
                                        if (
                                            e.metaKey ||
                                            e.ctrlKey ||
                                            e.shiftKey ||
                                            e.altKey
                                        )
                                            return;
                                        e.preventDefault();
                                        (this as any).$router.push('/');
                                    }
                                }
                            },
                            '← Dashboard'
                        ),
                        h(
                            'a',
                            {
                                attrs: { href: '/vue2' },
                                style: styles.buttonCyan,
                                on: {
                                    click: (e: MouseEvent) => {
                                        if (
                                            e.metaKey ||
                                            e.ctrlKey ||
                                            e.shiftKey ||
                                            e.altKey
                                        )
                                            return;
                                        e.preventDefault();
                                        (this as any).$router.push('/vue2');
                                    }
                                }
                            },
                            '← Home'
                        ),
                        h('span', { style: styles.separator }, '|'),
                        h(
                            'span',
                            { style: styles.currentPage },
                            'Current: Dashboard Page'
                        )
                    ])
                ]),

                h('div', { style: styles.grid }, [
                    h('div', { style: styles.statsBox }, [
                        h('h3', { style: styles.boxTitle }, '📈 Statistics'),
                        h('ul', { style: styles.list }, [
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Active Users: 1,234'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Page Views: 45,678'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Bounce Rate: 32%'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Avg. Session: 4m 12s'
                            )
                        ])
                    ]),
                    h('div', { style: styles.metricsBox }, [
                        h('h3', { style: styles.boxTitle }, '📉 Metrics'),
                        h('ul', { style: styles.list }, [
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Revenue: $12,345'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Conversions: 567'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• Uptime: 99.9%'
                            ),
                            h(
                                'li',
                                { style: styles.listItem },
                                '• API Calls: 89,012'
                            )
                        ])
                    ])
                ]),

                h('div', { style: styles.footer }, [
                    h(
                        'h3',
                        { style: styles.footerTitle },
                        '🛣️ Route: /vue2/dashboard'
                    ),
                    h(
                        'p',
                        { style: styles.footerDesc },
                        'Dashboard page of the Vue 2 micro-frontend'
                    )
                ])
            ])
        ]);
    }
});

export default DashboardPage;
