import type { EsmxOptions } from '@esmx/core';

export default {
    modules: {
        exports: ['root:src/store/index.ts']
    },
    async devApp(esmx) {
        return import('@esmx/rspack').then((m) => m.createRspackHtmlApp(esmx));
    }
} satisfies EsmxOptions;
