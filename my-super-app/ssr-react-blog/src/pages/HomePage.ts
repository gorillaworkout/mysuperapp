import React from 'react';
import { NavLink } from '../components/NavLink';
import { useAppStore } from 'ssr-npm-react/src/use-app-store';
import { formatDate } from 'ssr-share/src/utils/format';

const typeConfig: Record<string, { bg: string; color: string; icon: string }> = {
    info: { bg: '#dbeafe', color: '#1e40af', icon: 'ℹ️' },
    success: { bg: '#dcfce7', color: '#166534', icon: '✅' },
    warning: { bg: '#fef3c7', color: '#92400e', icon: '⚠️' },
    error: { bg: '#fee2e2', color: '#991b1b', icon: '❌' }
};

export const HomePage = () => {
    const store = useAppStore();

    return React.createElement('div', {
        style: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #faf5ff, #ede9fe)',
            padding: '2rem'
        }
    },
        React.createElement('div', {
            style: {
                maxWidth: '56rem',
                margin: '0 auto'
            }
        },
            // Main card
            React.createElement('div', {
                style: {
                    background: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '2rem',
                    marginBottom: '1.5rem'
                }
            },
                // Header
                React.createElement('div', { style: { textAlign: 'center', marginBottom: '1.5rem' } },
                    React.createElement('h1', { style: { fontSize: '2.25rem', fontWeight: '700', color: '#7c3aed', marginBottom: '0.5rem' } },
                        '📝 Notification Feed'
                    ),
                    React.createElement('p', { style: { fontSize: '1rem', color: '#4b5563' } },
                        'Live notification feed powered by shared state across frameworks'
                    ),
                    React.createElement('div', {
                        style: { marginTop: '0.75rem', display: 'inline-flex', gap: '0.5rem' }
                    },
                        React.createElement('span', {
                            style: { background: '#f3e8ff', color: '#6b21a8', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }
                        }, `${store.notifications.length} total`),
                        React.createElement('span', {
                            style: { background: store.unreadCount > 0 ? '#fee2e2' : '#dcfce7', color: store.unreadCount > 0 ? '#991b1b' : '#166534', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }
                        }, `${store.unreadCount} unread`)
                    )
                ),

                // Navigation
                React.createElement('div', {
                    style: { background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }
                },
                    React.createElement('span', { style: { fontSize: '0.875rem', color: '#6b7280' } }, '🧭'),
                    React.createElement(NavLink, { to: '/', style: { display: 'inline-block', background: '#6b7280', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, '← Dashboard'),
                    React.createElement(NavLink, { to: '/admin', style: { display: 'inline-block', background: '#4b5563', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, '🛠️ Admin Panel'),
                    React.createElement(NavLink, { to: '/blog/about', style: { display: 'inline-block', background: '#7c3aed', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, 'About →')
                ),

                // Actions
                React.createElement('div', {
                    style: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' as const }
                },
                    React.createElement('button', {
                        style: { background: '#7c3aed', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' },
                        onClick: () => store.addNotification({ title: 'New Post', message: 'A new blog post has been published!', type: 'info' })
                    }, '📝 Simulate Post'),
                    React.createElement('button', {
                        style: { background: '#22c55e', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' },
                        onClick: () => store.addNotification({ title: 'Comment Added', message: 'Someone commented on your article.', type: 'success' })
                    }, '💬 Simulate Comment'),
                    React.createElement('button', {
                        style: { background: '#f59e0b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' },
                        onClick: () => store.addNotification({ title: 'System Warning', message: 'Storage usage is above 80%.', type: 'warning' })
                    }, '⚠️ Simulate Warning'),
                    ...(store.unreadCount > 0
                        ? [React.createElement('button', {
                            key: 'mark-all',
                            style: { background: '#6b7280', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', marginLeft: 'auto' },
                            onClick: () => store.markAllAsRead()
                        }, '✓ Mark All Read')]
                        : [])
                ),

                // Feed
                store.notifications.length === 0
                    ? React.createElement('div', { style: { textAlign: 'center', padding: '3rem 1rem' } },
                        React.createElement('div', { style: { fontSize: '4rem', marginBottom: '1rem' } }, '🔔'),
                        React.createElement('h3', { style: { color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem' } }, 'No notifications yet'),
                        React.createElement('p', { style: { color: '#9ca3af', fontSize: '0.875rem' } }, 'Add notifications from the Admin panel or use the buttons above. They sync across all apps!')
                    )
                    : React.createElement('div', {},
                        ...store.notifications.map((n) => {
                            const cfg = typeConfig[n.type] || typeConfig.info;
                            return React.createElement('div', {
                                key: n.id,
                                style: {
                                    display: 'flex',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    background: n.read ? '#fafafa' : '#faf5ff',
                                    borderRadius: '0.75rem',
                                    marginBottom: '0.5rem',
                                    borderLeft: `4px solid ${cfg.color}`,
                                    opacity: n.read ? 0.7 : 1,
                                    cursor: n.read ? 'default' : 'pointer',
                                    transition: 'all 0.2s'
                                },
                                onClick: () => { if (!n.read) store.markAsRead(n.id); }
                            },
                                React.createElement('div', { style: { fontSize: '1.5rem', paddingTop: '0.1rem' } }, cfg.icon),
                                React.createElement('div', { style: { flex: 1 } },
                                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' } },
                                        React.createElement('span', { style: { fontWeight: '700', color: '#1f2937', fontSize: '0.9rem' } },
                                            `${n.read ? '' : '● '}${n.title}`
                                        ),
                                        React.createElement('span', {
                                            style: { fontSize: '0.7rem', color: '#9ca3af' }
                                        }, formatDate(n.timestamp))
                                    ),
                                    React.createElement('p', { style: { margin: 0, fontSize: '0.85rem', color: '#4b5563' } }, n.message),
                                    React.createElement('div', { style: { marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' } },
                                        React.createElement('span', {
                                            style: { fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: cfg.bg, color: cfg.color, fontWeight: '600' }
                                        }, n.type),
                                        React.createElement('span', {
                                            style: { fontSize: '0.65rem', color: '#9ca3af' }
                                        }, n.read ? 'Read' : 'Unread — click to mark as read')
                                    )
                                )
                            );
                        })
                    )
            ),

            // Footer
            React.createElement('div', {
                style: {
                    background: 'linear-gradient(to right, #7c3aed, #ec4899)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center' as const
                }
            },
                React.createElement('h3', { style: { fontWeight: '600', marginBottom: '0.5rem' } }, '🔗 Cross-Framework Notification System'),
                React.createElement('p', { style: { fontSize: '0.875rem', opacity: 0.9 } }, 'Create notifications here (React) → View in Admin (Vue 3) → Counts update on Dashboard'),
                React.createElement('div', { style: { marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' } },
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'React 18'),
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'Shared Store'),
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'Real-Time Sync')
                )
            )
        )
    );
};

export default HomePage;
