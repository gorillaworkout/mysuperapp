import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: { 'ssr-npm-base': './node_modules/ssr-npm-base/dist' },
    imports: {
      'vue': 'ssr-npm-vue3',
      '@esmx/router': 'ssr-npm-vue3',
      '@esmx/core': 'ssr-npm-vue3',
      '@esmx/class-state': 'ssr-npm-vue3',
      '@esmx/fetch': 'ssr-npm-vue3'
    },
    exports: [
      "pkg:vue"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;