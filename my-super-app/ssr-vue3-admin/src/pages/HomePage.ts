import { defineComponent, h } from 'vue';
import type { Ref } from 'vue';
import { useNavLink } from '../composables/useNavLink';
import { useAppStore } from 'ssr-npm-vue3/src/store-plugin';
import { mockUsers } from 'ssr-share/src/store';
import type { CartItem, Notification, User } from 'ssr-share/src/store';
import { formatPrice } from 'ssr-share/src/utils/format';

export default defineComponent({
    name: 'HomePage',
    setup() {
        const navLink = useNavLink();
        const store = useAppStore();

        const cartItems = store.cartItems as Ref<CartItem[]>;
        const cartTotal = store.cartTotal as Ref<number>;
        const notifications = store.notifications as Ref<Notification[]>;
        const unreadCount = store.unreadCount as Ref<number>;
        const markAsRead = store.markAsRead as (id: number) => void;
        const markAllAsRead = store.markAllAsRead as () => void;
        const addNotification = store.addNotification as (n: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
        const clearCart = store.clearCart as () => void;

        return {
            navLink,
            cartItems,
            cartTotal,
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            addNotification,
            clearCart
        };
    },
    render() {
        const sectionStyle = 'background: white; border-radius: 0.75rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.25rem;';
        const sectionTitle = 'margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 700; color: #1f2937; border-bottom: 2px solid #f3f4f6; padding-bottom: 0.5rem;';

        return h('div', { style: 'padding: 2rem; min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);' }, [
            h('div', { style: 'max-width: 64rem; margin: 0 auto;' }, [
                // Header
                h('div', { style: 'margin-bottom: 1.5rem;' }, [
                    h('h1', { style: 'color: #4b5563; margin: 0 0 0.25rem 0; font-size: 2rem;' }, '🛠️ Admin Panel'),
                    h('p', { style: 'color: #6b7280; margin: 0;' }, 'Manage users, notifications, and cart data across all micro-apps')
                ]),

                // Navigation
                h('div', { style: 'background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);' }, [
                    h('div', { style: 'display: flex; gap: 0.5rem; align-items: center;' }, [
                        h('span', { style: 'font-size: 0.875rem; color: #6b7280;' }, '🧭'),
                        this.navLink(
                            '/',
                            'display: inline-block; background: #6b7280; color: white; padding: 0.4rem 0.75rem; text-decoration: none; border-radius: 0.25rem; font-size: 0.875rem;',
                            '← Dashboard'
                        ),
                        this.navLink(
                            '/admin/settings',
                            'display: inline-block; background: #4b5563; color: white; padding: 0.4rem 0.75rem; text-decoration: none; border-radius: 0.25rem; font-size: 0.875rem;',
                            'Settings →'
                        )
                    ])
                ]),

                // Stats row
                h('div', { style: 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem;' }, [
                    { icon: '👥', label: 'Users', value: String(mockUsers.length), color: '#3b82f6' },
                    { icon: '🛒', label: 'Cart Items', value: String(this.cartItems.length), color: '#f97316' },
                    { icon: '💰', label: 'Cart Total', value: formatPrice(this.cartTotal), color: '#22c55e' },
                    { icon: '🔔', label: 'Unread', value: String(this.unreadCount), color: '#ef4444' }
                ].map((stat) =>
                    h('div', {
                        style: `background: white; padding: 1rem; border-radius: 0.75rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-top: 3px solid ${stat.color};`
                    }, [
                        h('div', { style: 'font-size: 1.5rem;' }, stat.icon),
                        h('div', { style: `font-size: 1.5rem; font-weight: 800; color: ${stat.color};` }, stat.value),
                        h('div', { style: 'font-size: 0.75rem; color: #6b7280;' }, stat.label)
                    ])
                )),

                // Content grid
                h('div', { style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;' }, [
                    // Users section
                    h('div', { style: sectionStyle }, [
                        h('h3', { style: sectionTitle }, '👥 Registered Users'),
                        ...mockUsers.map((user: User) =>
                            h('div', {
                                style: 'display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; background: #f9fafb; margin-bottom: 0.5rem;'
                            }, [
                                h('div', {
                                    style: 'width: 2.5rem; height: 2.5rem; border-radius: 9999px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.875rem;'
                                }, user.name.charAt(0)),
                                h('div', { style: 'flex: 1;' }, [
                                    h('div', { style: 'font-weight: 600; font-size: 0.875rem; color: #1f2937;' }, user.name),
                                    h('div', { style: 'font-size: 0.75rem; color: #6b7280;' }, user.email)
                                ]),
                                h('span', {
                                    style: `font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-weight: 600; ${
                                        user.role === 'admin'
                                            ? 'background: #fee2e2; color: #991b1b;'
                                            : 'background: #dbeafe; color: #1e40af;'
                                    }`
                                }, user.role)
                            ])
                        )
                    ]),

                    // Notifications section
                    h('div', { style: sectionStyle }, [
                        h('div', { style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 2px solid #f3f4f6; padding-bottom: 0.5rem;' }, [
                            h('h3', { style: 'margin: 0; font-size: 1.1rem; font-weight: 700; color: #1f2937;' }, `🔔 Notifications (${this.unreadCount})`),
                            h('div', { style: 'display: flex; gap: 0.5rem;' }, [
                                h('button', {
                                    style: 'background: #6366f1; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.7rem;',
                                    onClick: () => this.addNotification({
                                        title: 'Test Alert',
                                        message: `Admin notification at ${new Date().toLocaleTimeString()}`,
                                        type: 'info'
                                    })
                                }, '+ Add'),
                                ...(this.unreadCount > 0
                                    ? [h('button', {
                                        style: 'background: #22c55e; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.7rem;',
                                        onClick: () => this.markAllAsRead()
                                    }, '✓ Read All')]
                                    : [])
                            ])
                        ]),
                        ...(this.notifications.length === 0
                            ? [h('p', { style: 'color: #9ca3af; text-align: center; padding: 2rem 0; font-size: 0.875rem;' }, 'No notifications yet')]
                            : this.notifications.slice(0, 5).map((n: Notification) =>
                                h('div', {
                                    style: `padding: 0.6rem; border-radius: 0.5rem; margin-bottom: 0.4rem; cursor: pointer; transition: all 0.2s; border-left: 3px solid ${
                                        { info: '#3b82f6', success: '#22c55e', warning: '#f59e0b', error: '#ef4444' }[n.type]
                                    }; ${n.read ? 'background: #f9fafb; opacity: 0.7;' : 'background: #eff6ff;'}`,
                                    onClick: () => { if (!n.read) this.markAsRead(n.id); }
                                }, [
                                    h('div', { style: 'display: flex; justify-content: space-between; align-items: center;' }, [
                                        h('span', { style: 'font-weight: 600; font-size: 0.8rem; color: #1f2937;' }, `${n.read ? '' : '● '}${n.title}`),
                                        h('span', {
                                            style: `font-size: 0.6rem; padding: 0.1rem 0.4rem; border-radius: 0.25rem; background: ${
                                                { info: '#dbeafe', success: '#dcfce7', warning: '#fef3c7', error: '#fee2e2' }[n.type]
                                            }; color: ${
                                                { info: '#1e40af', success: '#166534', warning: '#92400e', error: '#991b1b' }[n.type]
                                            };`
                                        }, n.type)
                                    ]),
                                    h('p', { style: 'margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #6b7280;' }, n.message)
                                ])
                            ))
                    ]),

                    // Cart summary
                    h('div', { style: sectionStyle + ' grid-column: span 2;' }, [
                        h('div', { style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 2px solid #f3f4f6; padding-bottom: 0.5rem;' }, [
                            h('h3', { style: 'margin: 0; font-size: 1.1rem; font-weight: 700; color: #1f2937;' }, '🛒 Cart Summary'),
                            ...(this.cartItems.length > 0
                                ? [h('button', {
                                    style: 'background: #ef4444; color: white; border: none; padding: 0.3rem 0.75rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.75rem;',
                                    onClick: () => this.clearCart()
                                }, '🗑️ Clear Cart')]
                                : [])
                        ]),
                        ...(this.cartItems.length === 0
                            ? [h('p', { style: 'color: #9ca3af; text-align: center; padding: 1.5rem 0; font-size: 0.875rem;' }, 'Cart is empty. Add products from the E-Commerce page!')]
                            : [
                                h('div', { style: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: 0.75rem;' },
                                    this.cartItems.map((item: CartItem) =>
                                        h('div', {
                                            style: 'display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;'
                                        }, [
                                            h('div', {
                                                style: 'width: 2.5rem; height: 2.5rem; background: #fed7aa; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;'
                                            }, ['🎧', '⌚', '👟', '🎒', '⌨️', '🧘'][item.product.id - 1] || '📦'),
                                            h('div', { style: 'flex: 1;' }, [
                                                h('div', { style: 'font-weight: 600; font-size: 0.8rem; color: #1f2937;' }, item.product.name),
                                                h('div', { style: 'font-size: 0.7rem; color: #6b7280;' }, `${item.quantity}x ${formatPrice(item.product.price)}`)
                                            ]),
                                            h('span', { style: 'font-weight: 700; color: #f97316; font-size: 0.875rem;' }, formatPrice(item.product.price * item.quantity))
                                        ])
                                    )
                                ),
                                h('div', {
                                    style: 'margin-top: 1rem; padding-top: 0.75rem; border-top: 2px solid #f3f4f6; display: flex; justify-content: flex-end; align-items: center; gap: 1rem;'
                                }, [
                                    h('span', { style: 'font-size: 0.875rem; color: #6b7280;' }, `${this.cartItems.length} items`),
                                    h('span', { style: 'font-size: 1.25rem; font-weight: 800; color: #f97316;' }, `Total: ${formatPrice(this.cartTotal)}`)
                                ])
                            ])
                    ])
                ])
            ])
        ]);
    }
});
