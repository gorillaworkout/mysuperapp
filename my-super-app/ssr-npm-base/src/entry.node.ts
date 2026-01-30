import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    lib: true,
    links: {},
    imports: {},
    exports: [
      "pkg:@esmx/router",
      "pkg:@esmx/class-state"
    ]
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;
