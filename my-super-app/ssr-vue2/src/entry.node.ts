import type { EsmxOptions } from '@esmx/core';

export default {
    modules: {
        links: {
            'ssr-npm-base': './node_modules/ssr-npm-base/dist',
            'ssr-npm-vue2': './node_modules/ssr-npm-vue2/dist'
        },
        imports: {
            vue: 'ssr-npm-vue2/vue',
            '@esmx/router': 'ssr-npm-base/@esmx/router',
            '@esmx/router-vue': 'ssr-npm-vue2/@esmx/router-vue'
        },
        exports: ['root:src/index.ts', 'root:src/routes.ts']
    },
    async devApp(esmx) {
        return import('@esmx/rspack-vue').then((m) =>
            m.createRspackVue2App(esmx)
        );
    }
} satisfies EsmxOptions;
