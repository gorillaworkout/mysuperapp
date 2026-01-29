import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {},
    imports: {},
    exports: [
      "pkg:@esmx/router",
      "pkg:@esmx/core", 
      "pkg:@esmx/class-state",
      "pkg:@esmx/fetch"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;