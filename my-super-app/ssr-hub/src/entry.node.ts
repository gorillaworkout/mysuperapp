import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-base': './node_modules/ssr-npm-base/dist',
      'ssr-npm-react': './node_modules/ssr-npm-react/dist',
      'ssr-npm-vue2': './node_modules/ssr-npm-vue2/dist',
      'ssr-npm-vue3': './node_modules/ssr-npm-vue3/dist',
      'ssr-react': './node_modules/ssr-react/dist',
      'ssr-vue2': './node_modules/ssr-vue2/dist',
      'ssr-vue3': './node_modules/ssr-vue3/dist'
    },
    imports: {
      '@esmx/router': 'ssr-npm-base',
      '@esmx/router-react': 'ssr-npm-react',
      '@esmx/router-vue': 'ssr-npm-vue3',
      'react': 'ssr-npm-react',
      'react-dom': 'ssr-npm-react'
    },
    exports: []
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;
