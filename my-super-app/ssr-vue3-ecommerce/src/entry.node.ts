import type { EsmxOptions } from '@esmx/core';

export default {
    modules: {
        links: {
            'ssr-npm-base': './node_modules/ssr-npm-base/dist',
            'ssr-npm-vue3': './node_modules/ssr-npm-vue3/dist'
        },
        imports: {
            vue: 'ssr-npm-vue3/vue',
            '@esmx/router': 'ssr-npm-base/@esmx/router',
            '@esmx/router-vue': 'ssr-npm-vue3/@esmx/router-vue'
        },
        exports: ['root:src/index.ts', 'root:src/routes.ts']
    },
    async devApp(esmx) {
        return import('@esmx/rspack-vue').then((m) =>
            m.createRspackVue3App(esmx)
        );
    }
} satisfies EsmxOptions;
