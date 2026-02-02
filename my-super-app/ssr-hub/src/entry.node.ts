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
      'ssr-vue3': './node_modules/ssr-vue3/dist',
      'ssr-vue3-ecommerce': './node_modules/ssr-vue3-ecommerce/dist',
      'ssr-vue3-admin': './node_modules/ssr-vue3-admin/dist'
    },
    imports: {
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
