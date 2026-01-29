import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-vue3': './node_modules/ssr-npm-vue3/dist'
    },
    imports: {
      'vue': 'ssr-npm-vue3',
      '@esmx/router': 'ssr-npm-vue3/ssr-npm-base/@esmx/router',
      '@esmx/router-vue': 'ssr-npm-vue3/router-vue'
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
