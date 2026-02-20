import { appStore, Reactive, uniqueKeys } from 'ssr-share/src/store';
import type { CartItem, Notification, User } from 'ssr-share/src/store';
import { useEffect, useState } from 'react';

export interface ReactAppStore {
    // Reactive state values
    cartItems: CartItem[];
    cartTotal: number;
    currentUser: User | null;
    isAuthenticated: boolean;
    notifications: Notification[];
    unreadCount: number;
    darkMode: boolean;

    // Methods
    addToCart: typeof appStore.addToCart;
    removeFromCart: typeof appStore.removeFromCart;
    updateQuantity: typeof appStore.updateQuantity;
    clearCart: typeof appStore.clearCart;
    login: typeof appStore.login;
    logout: typeof appStore.logout;
    addNotification: typeof appStore.addNotification;
    markAsRead: typeof appStore.markAsRead;
    markAllAsRead: typeof appStore.markAllAsRead;
    toggleDarkMode: typeof appStore.toggleDarkMode;
}

function getSnapshot(): Record<string, unknown> {
    const snapshot: Record<string, unknown> = {};
    uniqueKeys.ref.forEach((key) => {
        snapshot[key] = appStore[key].value;
    });
    return snapshot;
}

function getMethods(): Record<string, unknown> {
    const methods: Record<string, unknown> = {};
    uniqueKeys.fn.forEach((key) => {
        methods[key] = (appStore[key] as (...args: unknown[]) => unknown).bind(appStore);
    });
    return methods;
}

// Cached methods (they never change)
const boundMethods = getMethods();

/**
 * React hook for the shared AppStore.
 * Subscribes to all Reactive changes and triggers re-renders.
 */
export function useAppStore(): ReactAppStore {
    const [snapshot, setSnapshot] = useState(getSnapshot);

    useEffect(() => {
        const unsubscribers: Array<() => void> = [];

        uniqueKeys.ref.forEach((key) => {
            const reactive = appStore[key];
            const unsub = reactive.addListener(() => {
                setSnapshot(getSnapshot());
            });
            unsubscribers.push(unsub);
        });

        // Sync initial state in case it changed between render and effect
        setSnapshot(getSnapshot());

        return () => {
            unsubscribers.forEach((unsub) => unsub());
        };
    }, []);

    return { ...snapshot, ...boundMethods } as unknown as ReactAppStore;
}
