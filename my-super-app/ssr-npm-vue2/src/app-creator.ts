import type { Router, RouterMicroAppOptions } from '@esmx/router';
import { RouterPlugin, useProvideRouter } from '@esmx/router-vue';
import type { VueConstructor } from 'vue';
import Vue from 'vue';

Vue.use(RouterPlugin);

declare global {
    interface Window {
        __ESMX_HYDRATED__?: boolean;
    }
}

export interface AppCreatorOptions {
    vueOptions?: Record<string, unknown>;
    beforeCreateApp?: (VueConstructor: VueConstructor) => void;
    afterCreateApp?: (app: InstanceType<VueConstructor>) => void;
    renderToString?: (
        app: unknown,
        context: Record<string, unknown>
    ) => Promise<string>;
    ssrCtx?: Record<string, unknown>;
}

export const appCreator = (
    router: Router,
    {
        vueOptions = {},
        beforeCreateApp,
        afterCreateApp,
        renderToString,
        ssrCtx = {}
    }: AppCreatorOptions = {}
): RouterMicroAppOptions => {
    beforeCreateApp?.(Vue);
    const app = new Vue({
        ...vueOptions,
        setup() {
            useProvideRouter(router);
        },
        render: (h) => h('router-view')
    });
    afterCreateApp?.(app);
    return {
        mount(root) {
            const ssrEl =
                typeof window !== 'undefined' && !window.__ESMX_HYDRATED__
                    ? root.querySelector('[data-server-rendered="true"]')
                    : null;
            if (typeof window !== 'undefined') {
                window.__ESMX_HYDRATED__ = true;
            }
            if (ssrEl) {
                app.$mount(ssrEl, true);
            } else {
                root.innerHTML = '';
                root.appendChild(app.$mount().$el);
            }
        },
        unmount() {
            app.$destroy();
            app.$el.remove();
        },
        async renderToString() {
            if (typeof renderToString !== 'function') return '';
            return renderToString(app, ssrCtx);
        }
    };
};
