import { Router } from '@esmx/router';
import { appCreator as reactAppCreator } from 'ssr-npm-react/src/app-creator';
import { appCreator as vue2AppCreator } from 'ssr-npm-vue2/src/app-creator';
import { Vue2AppStorePlugin } from 'ssr-npm-vue2/src/store-plugin';
import { appCreator as vue3AppCreator } from 'ssr-npm-vue3/src/app-creator';
import { Vue3AppStorePlugin } from 'ssr-npm-vue3/src/store-plugin';
import { routes } from './routes';

const isBrowser = typeof window === 'object' && typeof document === 'object';

export async function createApp({
    base,
    url,
    reactRenderToStr,
    vue2RenderToStr,
    vue3RenderToStr,
    ssrCtx = {}
}: {
    base: string;
    url: string;
    reactRenderToStr?: (element: unknown) => string;
    vue2RenderToStr?: (
        app: unknown,
        context: Record<string, unknown>
    ) => Promise<string>;
    vue3RenderToStr?: (
        app: unknown,
        context: Record<string, unknown>
    ) => Promise<string>;
    ssrCtx?: Record<string, unknown>;
}) {
    const router = new Router({
        root: '#app',
        base: new URL(base),
        routes,
        context: {},
        apps: {
            dashboard: (router) =>
                vue3AppCreator(router, {
                    afterCreateApp: (app) => {
                        app.use(Vue3AppStorePlugin);
                    },
                    renderToString: vue3RenderToStr,
                    ssrCtx
                }),
            react: (router) =>
                reactAppCreator(router, {
                    renderToString: reactRenderToStr
                }),
            blog: (router) =>
                reactAppCreator(router, {
                    renderToString: reactRenderToStr
                }),
            vue2: (router) =>
                vue2AppCreator(router, {
                    beforeCreateApp: (Vue) => {
                        Vue.use(Vue2AppStorePlugin);
                    },
                    renderToString: vue2RenderToStr,
                    ssrCtx
                }),
            vue3: (router) =>
                vue3AppCreator(router, {
                    afterCreateApp: (app) => {
                        app.use(Vue3AppStorePlugin);
                    },
                    renderToString: vue3RenderToStr,
                    ssrCtx
                }),
            ecommerce: (router) =>
                vue3AppCreator(router, {
                    afterCreateApp: (app) => {
                        app.use(Vue3AppStorePlugin);
                    },
                    renderToString: vue3RenderToStr,
                    ssrCtx
                }),
            admin: (router) =>
                vue3AppCreator(router, {
                    afterCreateApp: (app) => {
                        app.use(Vue3AppStorePlugin);
                    },
                    renderToString: vue3RenderToStr,
                    ssrCtx
                })
        }
    });
    await router.replace(url);
    if (isBrowser) (window as unknown as { router: Router }).router = router;
    return router;
}
