import React from 'react';
import { NavLink } from '../components/NavLink';
import { useAppStore } from 'ssr-npm-react/src/use-app-store';

export const HomePage = () => {
    const store = useAppStore();

    return React.createElement('div', {
        style: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
            padding: '2rem'
        }
    },
        React.createElement('div', {
            style: {
                maxWidth: '56rem',
                margin: '0 auto'
            }
        },
            // Header
            React.createElement('div', {
                style: {
                    background: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '2rem',
                    marginBottom: '1.5rem'
                }
            },
                React.createElement('div', { style: { textAlign: 'center', marginBottom: '1.5rem' } },
                    React.createElement('h1', { style: { fontSize: '2.25rem', fontWeight: '700', color: '#4f46e5', marginBottom: '0.5rem' } },
                        '⚛️ React App'
                    ),
                    React.createElement('p', { style: { fontSize: '1rem', color: '#4b5563' } },
                        'React 18 micro-app with Server-Side Rendering'
                    ),
                    React.createElement('div', {
                        style: { marginTop: '0.75rem', display: 'inline-block', background: '#dbeafe', color: '#1e40af', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }
                    }, `🔔 ${store.notifications?.length || 0} notifications`)
                ),

                // Navigation
                React.createElement('div', {
                    style: { background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }
                },
                    React.createElement('span', { style: { fontSize: '0.875rem', color: '#6b7280' } }, '🧭'),
                    React.createElement(NavLink, { to: '/', style: { display: 'inline-block', background: '#6b7280', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, '← Dashboard'),
                    React.createElement(NavLink, { to: '/react/about', style: { display: 'inline-block', background: '#6366f1', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, 'About →')
                ),

                // Features
                React.createElement('div', {
                    style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }
                },
                    ...[
                        { icon: '⚡', title: 'Server-Side Rendering', desc: 'HTML rendered on server via renderToString for fast initial load' },
                        { icon: '🔗', title: 'Shared State', desc: 'Cross-framework state shared with Vue 2 and Vue 3 apps' },
                        { icon: '🧩', title: 'Micro-Frontend', desc: 'Independent React app loaded via ESMX federation' },
                        { icon: '🔄', title: 'SPA Navigation', desc: 'Client-side routing between all micro-apps without page refresh' }
                    ].map((feature, i) =>
                        React.createElement('div', {
                            key: i,
                            style: {
                                background: '#f9fafb',
                                borderRadius: '0.75rem',
                                padding: '1.25rem',
                                borderLeft: '4px solid #4f46e5'
                            }
                        },
                            React.createElement('div', { style: { fontSize: '1.5rem', marginBottom: '0.5rem' } }, feature.icon),
                            React.createElement('h3', { style: { fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem', fontSize: '0.95rem' } }, feature.title),
                            React.createElement('p', { style: { fontSize: '0.8rem', color: '#6b7280', margin: 0 } }, feature.desc)
                        )
                    )
                )
            ),

            // Tech info
            React.createElement('div', {
                style: {
                    background: 'linear-gradient(to right, #6366f1, #9333ea)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center' as const
                }
            },
                React.createElement('h3', { style: { fontWeight: '600', marginBottom: '0.5rem' } }, '⚛️ React 18 + SSR Micro-App'),
                React.createElement('p', { style: { fontSize: '0.875rem', opacity: 0.9 } }, 'Part of the ESMX multi-framework micro-frontend architecture'),
                React.createElement('div', { style: { marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' } },
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'React 18'),
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'SSR'),
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'ESMX Federation')
                )
            )
        )
    );
};

export default HomePage;
