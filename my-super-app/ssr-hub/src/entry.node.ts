import http from 'node:http';
import type { EsmxOptions } from '@esmx/core';

const port = process.env.PORT || 3000;

export default {
    modules: {
        links: {
            'ssr-npm-base': './node_modules/ssr-npm-base/dist',
            'ssr-npm-react': './node_modules/ssr-npm-react/dist',
            'ssr-npm-vue2': './node_modules/ssr-npm-vue2/dist',
            'ssr-npm-vue3': './node_modules/ssr-npm-vue3/dist',
            'ssr-react': './node_modules/ssr-react/dist',
            'ssr-react-blog': './node_modules/ssr-react-blog/dist',
            'ssr-vue2': './node_modules/ssr-vue2/dist',
            'ssr-vue3': './node_modules/ssr-vue3/dist',
            'ssr-vue3-dashboard': './node_modules/ssr-vue3-dashboard/dist',
            'ssr-vue3-ecommerce': './node_modules/ssr-vue3-ecommerce/dist',
            'ssr-vue3-admin': './node_modules/ssr-vue3-admin/dist'
        },
        imports: {
            react: 'ssr-npm-react/react',
            'react-dom': 'ssr-npm-react/react-dom',
            '@esmx/router': 'ssr-npm-base/@esmx/router',
            '@esmx/router-react': 'ssr-npm-react/@esmx/router-react',
            vue: 'ssr-npm-vue3/vue',
            '@esmx/router-vue': 'ssr-npm-vue3/@esmx/router-vue'
        }
    },
    async devApp(esmx) {
        return import('@esmx/rspack-vue').then((m) =>
            m.createRspackVue3App(esmx)
        );
    },
    async server(esmx) {
        const server = http.createServer((req, res) => {
            esmx.middleware(req, res, async () => {
                const rc = await esmx.render({
                    params: {
                        req,
                        res
                    }
                });
                res.end(rc.html);
            });
        });

        server.listen(port, () => {
            console.log(`Server started: http://localhost:${port}`);
        });
    },
    async postBuild(esmx) {
        const rc = await esmx.render({
            params: { url: '/' }
        });
        esmx.writeSync(esmx.resolvePath('dist/client', 'index.html'), rc.html);
    }
} satisfies EsmxOptions;
