import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: { 'ssr-npm-base': './node_modules/ssr-npm-base/dist' },
    imports: {
      'react': 'ssr-npm-react',
      'react-dom': 'ssr-npm-react',
      '@esmx/router': 'ssr-npm-react',
      '@esmx/core': 'ssr-npm-react',
      '@esmx/class-state': 'ssr-npm-react',
      '@esmx/fetch': 'ssr-npm-react'
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