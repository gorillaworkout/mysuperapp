import React from 'react';
import { NavLink } from '../components/NavLink';
import { useAppStore } from 'ssr-npm-react/src/use-app-store';
import { formatPrice } from 'ssr-share/src/utils/format';

const productIcons: Record<number, string> = {
    1: '🎧', 2: '⌚', 3: '👟', 4: '🎒', 5: '⌨️', 6: '🧘'
};

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
                        '⚛️ React Cart View'
                    ),
                    React.createElement('p', { style: { fontSize: '1rem', color: '#4b5563' } },
                        'View and manage your shopping cart — shared across all frameworks'
                    ),
                    React.createElement('div', {
                        style: { marginTop: '0.75rem', display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }
                    }, `🛒 ${store.cartItems.length} items · ${formatPrice(store.cartTotal)}`)
                ),

                // Navigation
                React.createElement('div', {
                    style: { background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }
                },
                    React.createElement('span', { style: { fontSize: '0.875rem', color: '#6b7280' } }, '🧭'),
                    React.createElement(NavLink, { to: '/', style: { display: 'inline-block', background: '#6b7280', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, '← Dashboard'),
                    React.createElement(NavLink, { to: '/ecommerce', style: { display: 'inline-block', background: '#f97316', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, '🛒 Add Products'),
                    React.createElement(NavLink, { to: '/react/about', style: { display: 'inline-block', background: '#6366f1', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '0.25rem', textDecoration: 'none', fontSize: '0.875rem' } }, 'About →')
                ),

                // Cart content
                store.cartItems.length === 0
                    ? React.createElement('div', {
                        style: { textAlign: 'center', padding: '3rem 1rem' }
                    },
                        React.createElement('div', { style: { fontSize: '4rem', marginBottom: '1rem' } }, '🛒'),
                        React.createElement('h3', { style: { color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem' } }, 'Your cart is empty'),
                        React.createElement('p', { style: { color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.5rem' } }, 'Add products from the E-Commerce page (Vue 3) and see them appear here in React!'),
                        React.createElement(NavLink, {
                            to: '/ecommerce',
                            style: { display: 'inline-block', background: '#f97316', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '600' }
                        }, '🛒 Go to E-Commerce Store')
                    )
                    : React.createElement('div', {},
                        // Cart items
                        ...store.cartItems.map((item) =>
                            React.createElement('div', {
                                key: item.product.id,
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '0.75rem',
                                    marginBottom: '0.75rem',
                                    borderLeft: '4px solid #4f46e5'
                                }
                            },
                                // Icon
                                React.createElement('div', {
                                    style: {
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
                                        borderRadius: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem'
                                    }
                                }, productIcons[item.product.id] || '📦'),
                                // Info
                                React.createElement('div', { style: { flex: 1 } },
                                    React.createElement('div', { style: { fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' } }, item.product.name),
                                    React.createElement('div', { style: { fontSize: '0.8rem', color: '#6b7280' } },
                                        `${item.quantity}x ${formatPrice(item.product.price)} · ${item.product.category}`
                                    )
                                ),
                                // Quantity controls
                                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
                                    React.createElement('button', {
                                        style: { width: '2rem', height: '2rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' },
                                        onClick: () => store.updateQuantity(item.product.id, item.quantity - 1)
                                    }, '−'),
                                    React.createElement('span', { style: { fontWeight: '700', minWidth: '1.5rem', textAlign: 'center' as const, color: '#1f2937' } }, String(item.quantity)),
                                    React.createElement('button', {
                                        style: { width: '2rem', height: '2rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' },
                                        onClick: () => store.updateQuantity(item.product.id, item.quantity + 1)
                                    }, '+')
                                ),
                                // Subtotal
                                React.createElement('div', { style: { minWidth: '5rem', textAlign: 'right' as const } },
                                    React.createElement('div', { style: { fontWeight: '800', color: '#4f46e5', fontSize: '1rem' } }, formatPrice(item.product.price * item.quantity))
                                ),
                                // Remove
                                React.createElement('button', {
                                    style: { background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '0.375rem', padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' },
                                    onClick: () => store.removeFromCart(item.product.id)
                                }, '✕')
                            )
                        ),

                        // Total bar
                        React.createElement('div', {
                            style: {
                                marginTop: '1rem',
                                padding: '1.25rem',
                                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: 'white'
                            }
                        },
                            React.createElement('div', {},
                                React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.9 } }, `${store.cartItems.reduce((sum, i) => sum + i.quantity, 0)} items in cart`),
                                React.createElement('div', { style: { fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' } }, 'Shared state with Vue 3 E-Commerce')
                            ),
                            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                                React.createElement('span', { style: { fontSize: '1.5rem', fontWeight: '800' } }, formatPrice(store.cartTotal)),
                                React.createElement('button', {
                                    style: { background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' },
                                    onClick: () => store.clearCart()
                                }, '🗑️ Clear')
                            )
                        )
                    )
            ),

            // Footer
            React.createElement('div', {
                style: {
                    background: 'linear-gradient(to right, #6366f1, #9333ea)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center' as const
                }
            },
                React.createElement('h3', { style: { fontWeight: '600', marginBottom: '0.5rem' } }, '🔗 Cross-Framework Shared State Demo'),
                React.createElement('p', { style: { fontSize: '0.875rem', opacity: 0.9 } }, 'This React app reads the same cart state that Vue 3 E-Commerce writes to'),
                React.createElement('div', { style: { marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' } },
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'React 18'),
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'Shared Store'),
                    React.createElement('span', { style: { background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' } }, 'Cross-Framework')
                )
            )
        )
    );
};

export default HomePage;
