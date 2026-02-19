import type { Router } from '@esmx/router';
import { RouterPlugin, RouterView, useProvideRouter } from '@esmx/router-vue';
import { createApp as createVueApp, defineComponent, h } from 'vue';

export const App = defineComponent({
    name: 'App',
    setup() {
        return () => h(RouterView);
    }
});

function createRootComponent(router: Router) {
    return defineComponent({
        name: 'Root',
        setup() {
            useProvideRouter(router);
            return () => h(App);
        }
    });
}

export function createApp(router: Router) {
    let app: ReturnType<typeof createVueApp> | null = null;
    let vueContainer: HTMLDivElement | null = null;

    return {
        mount(el: HTMLElement) {
            vueContainer = document.createElement('div');
            el.appendChild(vueContainer);
            app = createVueApp(createRootComponent(router));
            app.use(RouterPlugin);
            app.mount(vueContainer);
        },
        unmount() {
            app?.unmount();
            app = null;
            vueContainer?.remove();
            vueContainer = null;
        }
    };
}
