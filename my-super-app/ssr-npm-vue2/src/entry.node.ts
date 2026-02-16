import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: { 
      'ssr-npm-base': './node_modules/ssr-npm-base/dist' 
    },
    imports: {
      'vue': 'ssr-npm-vue2',
      '@esmx/router': 'ssr-npm-vue2',
      '@esmx/core': 'ssr-npm-vue2',
      '@esmx/class-state': 'ssr-npm-vue2',
      '@esmx/fetch': 'ssr-npm-vue2'
    },
    exports: [
      "pkg:vue",
      "pkg:@esmx/router-vue"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;