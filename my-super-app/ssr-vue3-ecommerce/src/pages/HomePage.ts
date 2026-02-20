import { defineComponent, h } from 'vue';
import type { Ref } from 'vue';
import { useNavLink } from '../composables/useNavLink';
import { useAppStore } from 'ssr-npm-vue3/src/store-plugin';
import { mockProducts } from 'ssr-share/src/store';
import type { CartItem, Product } from 'ssr-share/src/store';
import { formatPrice } from 'ssr-share/src/utils/format';

export default defineComponent({
    name: 'HomePage',
    setup() {
        const navLink = useNavLink();
        const store = useAppStore();

        const cartItems = store.cartItems as Ref<CartItem[]>;
        const cartTotal = store.cartTotal as Ref<number>;
        const addToCart = store.addToCart as (product: Product, quantity?: number) => void;

        const getCartQuantity = (productId: number): number => {
            const item = cartItems.value.find(
                (i: CartItem) => i.product.id === productId
            );
            return item ? item.quantity : 0;
        };

        return { navLink, cartItems, cartTotal, addToCart, getCartQuantity };
    },
    render() {
        const cartCount = this.cartItems.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0
        );

        return h('div', { style: 'padding: 2rem; min-height: 100vh; background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);' }, [
            h('div', { style: 'max-width: 56rem; margin: 0 auto;' }, [
                // Header
                h('div', { style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;' }, [
                    h('div', {}, [
                        h('h1', { style: 'color: #f97316; margin: 0 0 0.25rem 0; font-size: 2rem;' }, '🛒 E-Commerce Store'),
                        h('p', { style: 'color: #6b7280; margin: 0;' }, 'Browse products and add to your shared cart')
                    ]),
                    h('div', { style: 'display: flex; align-items: center; gap: 1rem;' }, [
                        h('div', {
                            style: 'background: white; padding: 0.75rem 1.25rem; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 0.5rem;'
                        }, [
                            h('span', { style: 'font-size: 1.25rem;' }, '🛒'),
                            h('span', { style: 'font-weight: 700; color: #f97316;' }, String(cartCount)),
                            h('span', { style: 'color: #6b7280; font-size: 0.875rem;' }, `· ${formatPrice(this.cartTotal)}`)
                        ])
                    ])
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
                            '/ecommerce/about',
                            'display: inline-block; background: #f97316; color: white; padding: 0.4rem 0.75rem; text-decoration: none; border-radius: 0.25rem; font-size: 0.875rem;',
                            'About →'
                        ),
                        this.navLink(
                            '/react',
                            'display: inline-block; background: #3b82f6; color: white; padding: 0.4rem 0.75rem; text-decoration: none; border-radius: 0.25rem; font-size: 0.875rem;',
                            '⚛️ View Cart in React'
                        )
                    ])
                ]),

                // Products grid
                h('div', { style: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem;' },
                    mockProducts.map((product: Product) => {
                        const qty = this.getCartQuantity(product.id);
                        return h('div', {
                            style: 'background: white; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s;'
                        }, [
                            h('div', {
                                style: `height: 10rem; background: linear-gradient(135deg, #fed7aa, #fde68a); display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative;`
                            }, [
                                h('span', {}, ['🎧', '⌚', '👟', '🎒', '⌨️', '🧘'][product.id - 1] || '📦'),
                                // Category tag
                                h('span', {
                                    style: 'position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.6); color: white; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 0.25rem;'
                                }, product.category),
                                // Quantity badge if in cart
                                ...(qty > 0
                                    ? [h('span', {
                                        style: 'position: absolute; top: 0.5rem; left: 0.5rem; background: #ef4444; color: white; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px; min-width: 1.25rem; text-align: center;'
                                    }, String(qty))]
                                    : [])
                            ]),
                            h('div', { style: 'padding: 1rem;' }, [
                                h('h3', { style: 'margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 700; color: #1f2937;' }, product.name),
                                h('p', { style: 'margin: 0 0 0.5rem 0; font-size: 0.75rem; color: #6b7280;' }, product.description),
                                h('div', { style: 'display: flex; justify-content: space-between; align-items: center;' }, [
                                    h('span', { style: 'font-size: 1.25rem; font-weight: 800; color: #f97316;' }, formatPrice(product.price)),
                                    h('button', {
                                        style: `padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; ${
                                            qty > 0
                                                ? 'background: #22c55e; color: white;'
                                                : 'background: #f97316; color: white;'
                                        }`,
                                        onClick: () => this.addToCart(product)
                                    }, qty > 0 ? `+ Add More (${qty})` : '🛒 Add to Cart')
                                ]),
                                h('div', { style: 'margin-top: 0.5rem; font-size: 0.7rem; color: #9ca3af;' }, `${product.stock} in stock`)
                            ])
                        ]);
                    })
                ),

                // Footer
                h('div', {
                    style: 'background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 1.5rem; border-radius: 0.75rem; text-align: center;'
                }, [
                    h('h3', { style: 'margin: 0 0 0.5rem 0;' }, '🔗 Cross-Framework Shared State'),
                    h('p', { style: 'margin: 0; font-size: 0.875rem; opacity: 0.9;' }, 'Add products here (Vue 3) → View cart in React App → See counts on Dashboard')
                ])
            ])
        ]);
    }
});
