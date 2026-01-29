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
    return {
      async start() {
        console.log('ssr-npm-base provider ready');
        return new Promise(() => {}); // Keep running
      }
    };
  }
} satisfies EsmxOptions;