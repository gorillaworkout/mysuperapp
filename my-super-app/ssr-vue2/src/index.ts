import type { Router as RouterType } from '@esmx/router';
import { RouterPlugin, RouterView, useProvideRouter } from '@esmx/router-vue';
import Vue, { defineComponent, h } from 'vue';

Vue.use(RouterPlugin);

export const App = defineComponent({
    name: 'App',
    setup() {
        return () => h(RouterView);
    }
});

function createRootComponent(router: RouterType) {
    return defineComponent({
        name: 'Root',
        setup() {
            useProvideRouter(router);
            return () => h(App);
        }
    });
}

export function createApp(router: RouterType) {
    let vm: any = null;
    let vueContainer: HTMLDivElement | null = null;

    return {
        mount(el: HTMLElement) {
            vueContainer = document.createElement('div');
            el.appendChild(vueContainer);

            vm = new Vue({
                router,
                render: (h: any) => h(createRootComponent(router))
            } as any);
            vm.$mount(vueContainer);
        },
        unmount() {
            if (vm) {
                vm.$el?.remove();
                vm.$destroy();
                vm = null;
            }
            vueContainer = null;
        }
    };
}
