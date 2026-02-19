import { Router } from '@esmx/router';
import { appCreator as reactAppCreator } from 'ssr-npm-react/src/app-creator';
import { appCreator as vue2AppCreator } from 'ssr-npm-vue2/src/app-creator';
import { appCreator as vue3AppCreator } from 'ssr-npm-vue3/src/app-creator';
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
                    renderToString: vue2RenderToStr,
                    ssrCtx
                }),
            vue3: (router) =>
                vue3AppCreator(router, {
                    renderToString: vue3RenderToStr,
                    ssrCtx
                }),
            ecommerce: (router) =>
                vue3AppCreator(router, {
                    renderToString: vue3RenderToStr,
                    ssrCtx
                }),
            admin: (router) =>
                vue3AppCreator(router, {
                    renderToString: vue3RenderToStr,
                    ssrCtx
                })
        }
    });
    await router.replace(url);
    if (isBrowser) (window as any).router = router;
    return router;
}
