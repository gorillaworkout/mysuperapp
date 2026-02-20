import type { EsmxOptions } from '@esmx/core';

export default {
    modules: {
        links: {
            'ssr-share': './node_modules/ssr-share/dist',
            'ssr-npm-base': './node_modules/ssr-npm-base/dist',
            'ssr-npm-react': './node_modules/ssr-npm-react/dist'
        },
        imports: {
            react: 'ssr-npm-react/react',
            'react-dom': 'ssr-npm-react/react-dom',
            '@esmx/router': 'ssr-npm-base/@esmx/router',
            '@esmx/router-react': 'ssr-npm-react/@esmx/router-react'
        },
        exports: ['root:src/index.ts', 'root:src/routes.ts']
    },
    async devApp(esmx) {
        return import('@esmx/rspack').then((m) =>
            m.createRspackHtmlApp(esmx, { chain() {} })
        );
    }
} satisfies EsmxOptions;
