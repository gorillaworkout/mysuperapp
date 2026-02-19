import type { Router, RouterMicroAppOptions } from '@esmx/router';
import { RouterPlugin, RouterView, useProvideRouter } from '@esmx/router-vue';
import { createSSRApp, h, provide, ssrContextKey } from 'vue';

declare global {
    interface Window {
        __ESMX_HYDRATED__?: boolean;
    }
}

export interface AppCreatorOptions {
    vueOptions?: Record<string, unknown>;
    beforeCreateApp?: () => void;
    afterCreateApp?: (app: ReturnType<typeof createSSRApp>) => void;
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
    beforeCreateApp?.();
    const app = createSSRApp({
        ...vueOptions,
        setup() {
            useProvideRouter(router);
            provide(ssrContextKey, ssrCtx);
        },
        render: () => h(RouterView)
    });
    app.use(RouterPlugin);
    afterCreateApp?.(app);
    let mountEl: HTMLElement | null = null;
    return {
        mount(root) {
            const ssrEl =
                typeof window !== 'undefined' && !window.__ESMX_HYDRATED__
                    ? root.querySelector('[data-server-rendered]')
                    : null;
            if (typeof window !== 'undefined') {
                window.__ESMX_HYDRATED__ = true;
            }
            if (ssrEl) {
                app.mount(ssrEl);
                mountEl = ssrEl as HTMLElement;
            } else {
                root.innerHTML = '';
                const el = document.createElement('div');
                app.mount(el);
                root.appendChild(el);
                mountEl = el;
            }
        },
        unmount() {
            app.unmount();
            if (mountEl) {
                mountEl.remove();
                mountEl = null;
            }
        },
        async renderToString() {
            if (typeof renderToString !== 'function') return '';
            return renderToString(app, ssrCtx);
        }
    };
};
