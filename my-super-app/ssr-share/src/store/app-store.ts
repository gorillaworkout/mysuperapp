import type { CartItem, Notification, Product, User } from './types';

export interface Ref<T> {
    value: T;
}

export type ChangeListener<T> = (newValue: T, oldValue: T) => void;

export class Reactive<T> implements Ref<T> {
    private _value: T;
    private listeners: Set<ChangeListener<T>> = new Set();

    constructor(initialValue: T) {
        this._value = initialValue;
    }

    get value(): T {
        return this._value;
    }

    set value(newValue: T) {
        const oldValue = this._value;
        this._value = newValue;
        this.listeners.forEach((listener) => listener(newValue, oldValue));
    }

    addListener(listener: ChangeListener<T>): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

export function ref<T>(initialValue: T): Reactive<T> {
    return new Reactive(initialValue);
}

export class AppStore {
    // Cart state
    cartItems = ref<CartItem[]>([]);
    cartTotal = ref(0);

    // User state
    currentUser = ref<User | null>(null);
    isAuthenticated = ref(false);

    // Notifications
    notifications = ref<Notification[]>([]);
    unreadCount = ref(0);

    // Theme
    darkMode = ref(false);

    // Cart methods
    addToCart(product: Product, quantity = 1) {
        const items = [...this.cartItems.value];
        const existing = items.find(
            (item) => item.product.id === product.id
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            items.push({ product, quantity });
        }

        this.cartItems.value = items;
        this.updateCartTotal();
    }

    removeFromCart(productId: number) {
        this.cartItems.value = this.cartItems.value.filter(
            (item) => item.product.id !== productId
        );
        this.updateCartTotal();
    }

    updateQuantity(productId: number, quantity: number) {
        const items = [...this.cartItems.value];
        const item = items.find((i) => i.product.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(productId);
                return;
            }
            this.cartItems.value = items;
            this.updateCartTotal();
        }
    }

    clearCart() {
        this.cartItems.value = [];
        this.cartTotal.value = 0;
    }

    private updateCartTotal() {
        this.cartTotal.value = this.cartItems.value.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    }

    // User methods
    login(user: User) {
        this.currentUser.value = user;
        this.isAuthenticated.value = true;
    }

    logout() {
        this.currentUser.value = null;
        this.isAuthenticated.value = false;
        this.clearCart();
    }

    // Notification methods
    addNotification(notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) {
        const newNotification: Notification = {
            ...notification,
            id: Date.now(),
            read: false,
            timestamp: Date.now()
        };
        this.notifications.value = [newNotification, ...this.notifications.value];
        this.unreadCount.value = this.notifications.value.filter((n) => !n.read).length;
    }

    markAsRead(notificationId: number) {
        const notifications = [...this.notifications.value];
        const notification = notifications.find((n) => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.notifications.value = notifications;
            this.unreadCount.value = notifications.filter((n) => !n.read).length;
        }
    }

    markAllAsRead() {
        this.notifications.value = this.notifications.value.map((n) => ({
            ...n,
            read: true
        }));
        this.unreadCount.value = 0;
    }

    // Theme methods
    toggleDarkMode() {
        this.darkMode.value = !this.darkMode.value;
    }
}

export const appStore = new AppStore();

type AppStoreRefKeys = {
    [K in keyof AppStore]: AppStore[K] extends Reactive<unknown> ? K : never;
}[keyof AppStore];
type AppStoreMethodKeys = {
    [K in keyof AppStore]: AppStore[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof AppStore];

export const uniqueKeys = (() => {
    const allKeys = [
        ...(Object.keys(appStore) as (keyof AppStore)[]),
        ...(Object.getOwnPropertyNames(
            Object.getPrototypeOf(appStore)
        ).filter((key) => key !== 'constructor') as (keyof AppStore)[])
    ];

    return [...new Set(allKeys)].reduce(
        (acc, key) => {
            const value = appStore[key];
            if (value instanceof Reactive) {
                acc.ref.push(key as AppStoreRefKeys);
            } else if (typeof value === 'function') {
                acc.fn.push(key as AppStoreMethodKeys);
            }
            return acc;
        },
        { ref: [] as AppStoreRefKeys[], fn: [] as AppStoreMethodKeys[] }
    );
})();
