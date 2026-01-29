import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-vue2': './node_modules/ssr-npm-vue2/dist'
    },
    imports: {
      'vue': 'ssr-npm-vue2',
      '@esmx/router': 'ssr-npm-vue2/ssr-npm-base/@esmx/router',
      '@esmx/router-vue': 'ssr-npm-vue2/router-vue'
    },
    exports: [
      "pages/HomePage"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;
