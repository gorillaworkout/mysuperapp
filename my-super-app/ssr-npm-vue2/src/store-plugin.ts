import { type AppStore, appStore, Reactive, uniqueKeys } from 'ssr-share/src/store';
import Vue, { getCurrentInstance } from 'vue';

// Extend Vue 2 instance types
declare module 'vue/types/vue' {
    interface Vue {
        $appStore: Record<string, unknown>;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        appStore?: Record<string, unknown>;
    }
}

/**
 * Vue 2 reactive wrapper for the shared AppStore.
 * Bridges ssr-share's Reactive instances into Vue 2 observables with bidirectional sync.
 */
export class Vue2AppStore {
    private _store: AppStore;
    private _reactiveStore: Record<string, unknown> = {};
    private _cleanupFunctions: Array<() => void> = [];
    private _vueInstance: Vue;

    constructor(store: AppStore = appStore) {
        this._store = store;
        this._vueInstance = new Vue({ data: () => ({}) });
        this.createReactiveStore();
    }

    private createReactiveStore(): void {
        // Wrap each Reactive ref into a Vue 2 observable with bidirectional sync
        uniqueKeys.ref.forEach((key) => {
            const value = this._store[key];
            const reactiveData = Vue.observable({ value: value.value });

            // Reactive → Vue observable
            const unsubscribeFromReactive = value.addListener(
                (newValue: unknown) => {
                    if (reactiveData.value !== newValue) {
                        Vue.set(reactiveData, 'value', newValue);
                    }
                }
            );

            // Vue observable → Reactive
            const unwatch = this._vueInstance.$watch(
                () => reactiveData.value,
                (newValue: unknown) => {
                    if (newValue !== value.value) {
                        (value as Reactive<unknown>).value = newValue;
                    }
                },
                { deep: true }
            );

            this._reactiveStore[key] = reactiveData;
            this._cleanupFunctions.push(unsubscribeFromReactive);
            this._cleanupFunctions.push(unwatch);
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
        this._vueInstance.$destroy();
        this._reactiveStore = {};
    }
}

// Global singleton
let globalStoreInstance: Vue2AppStore | null = null;

// Vue 2 Plugin
export const Vue2AppStorePlugin = {
    install(VueConstructor: typeof Vue) {
        if (globalStoreInstance) {
            VueConstructor.prototype.$appStore = globalStoreInstance.getStore();
            return;
        }
        globalStoreInstance = new Vue2AppStore();
        VueConstructor.prototype.$appStore = globalStoreInstance.getStore();
    }
};

// Composable hook (Vue 2.7 setup)
export function useAppStore(): Record<string, unknown> {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error(
            'useAppStore must be called within a component setup function'
        );
    }

    const store =
        (instance.proxy as unknown as { $appStore: Record<string, unknown> }).$appStore;

    if (!store) {
        throw new Error(
            'AppStore not found. Make sure Vue2AppStorePlugin is installed.'
        );
    }

    return store;
}
