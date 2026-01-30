import type { EsmxOptions } from "@esmx/core"

export default {
    modules: {
        links: {
            'ssr-npm-base': "./node_modules/ssr-npm-base/dist",
            'ssr-npm-vue3': "./node_modules/ssr-npm-vue3/dist"
        },
        imports: {
            "vue": 'ssr-npm-vue3',
            "@esmx/router": 'ssr-npm-base',
            "@esmx/router-vue": 'ssr-npm-vue3'
        },
        exports: []
    },
    async devApp(esmx) {
        return import("@esmx/rspack").then((m) => m.createRspackHtmlApp(esmx, { chain() { } }))
    }
} satisfies EsmxOptions