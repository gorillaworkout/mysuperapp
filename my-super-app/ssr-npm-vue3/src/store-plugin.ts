import { type AppStore, appStore, Reactive, uniqueKeys } from 'ssr-share/src/store';
import { type App, inject, type Plugin, ref, watch } from 'vue';

/**
 * Vue 3 reactive wrapper for the shared AppStore.
 * Bridges ssr-share's Reactive instances into Vue 3 refs with bidirectional sync.
 */
export class Vue3AppStore {
    private _store: AppStore;
    private _reactiveStore: Record<string, unknown> = {};
    private _cleanupFunctions: Array<() => void> = [];

    constructor(store: AppStore = appStore) {
        this._store = store;
        this.createReactiveStore();
    }

    private createReactiveStore(): void {
        // Wrap each Reactive ref into a Vue 3 ref with bidirectional sync
        uniqueKeys.ref.forEach((key) => {
            const value = this._store[key];

            // Create a Vue 3 ref from the current Reactive value
            const vueRef = ref(value.value);

            // Reactive → Vue ref
            const unsubscribeFromReactive = value.addListener(
                (newValue: unknown) => {
                    if (vueRef.value !== newValue) {
                        vueRef.value = newValue;
                    }
                }
            );

            // Vue ref → Reactive
            const unsubscribeFromVue = watch(
                vueRef,
                (newValue: unknown) => {
                    if (newValue !== value.value) {
                        (value as Reactive<unknown>).value = newValue;
                    }
                },
                { deep: true }
            );

            this._reactiveStore[key] = vueRef;
            this._cleanupFunctions.push(unsubscribeFromReactive);
            this._cleanupFunctions.push(unsubscribeFromVue);
        });

        // Bind methods to the original store
        uniqueKeys.fn.forEach((key) => {
            const value = this._store[key];
            this._reactiveStore[key] = (value as (...args: unknown[]) => unknown).bind(this._store);
        });
    }

    getStore(): Record<string, unknown> {
        return this._reactiveStore;
    }

    destroy(): void {
        this._cleanupFunctions.forEach((cleanup) => cleanup());
        this._cleanupFunctions = [];
        this._reactiveStore = {};
    }
}

// Vue 3 Plugin
export const Vue3AppStorePlugin: Plugin = {
    install(app: App) {
        const storeInstance = new Vue3AppStore();

        app.provide('appStore', storeInstance.getStore());
        app.config.globalProperties.$appStore = storeInstance.getStore();

        const originalUnmount = app.unmount;
        app.unmount = function () {
            storeInstance.destroy();
            return originalUnmount.call(this);
        };
    }
};

// Composable hook
export function useAppStore(): Record<string, unknown> {
    const store = inject<Record<string, unknown>>('appStore');
    if (!store) {
        throw new Error(
            'AppStore not found. Make sure Vue3AppStorePlugin is installed.'
        );
    }
    return store;
}
