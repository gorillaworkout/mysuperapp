import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: { 
      'ssr-npm-base': './node_modules/ssr-npm-base/dist' 
    },
    imports: {
      '@esmx/router': 'ssr-npm-base/@esmx/router',
      '@esmx/core': 'ssr-npm-base/@esmx/core',
      '@esmx/class-state': 'ssr-npm-base/@esmx/class-state',
      '@esmx/fetch': 'ssr-npm-base/@esmx/fetch'
    },
    exports: [
      "pkg:react",
      "pkg:react-dom",
      "pkg:ssr-npm-base",
      "pkg:ssr-npm-base/@esmx/router-react"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;