import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: { 'ssr-npm-base': './node_modules/ssr-npm-base/dist' },
    imports: {
      '@esmx/router': 'ssr-npm-base/@esmx/router'
    },
    exports: [
      "pkg:react",
      "pkg:react-dom"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;