import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-react': './node_modules/ssr-npm-react/dist'
    },
    imports: {
      'react': 'ssr-npm-react',
      'react-dom': 'ssr-npm-react',
      '@esmx/router': 'ssr-npm-react',
      '@esmx/router-react': 'ssr-npm-react'
    },
    exports: []
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;
