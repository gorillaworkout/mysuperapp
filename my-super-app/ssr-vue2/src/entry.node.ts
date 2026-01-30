import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-base': './node_modules/ssr-npm-base/dist',
      'ssr-npm-vue2': './node_modules/ssr-npm-vue2/dist'
    },
    imports: {
      'vue': 'ssr-npm-vue2',
      '@esmx/router': 'ssr-npm-base',
      '@esmx/router-vue': 'ssr-npm-vue2'
    },
    exports: []
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;
