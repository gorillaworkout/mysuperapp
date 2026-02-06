import { createApp } from 'ssr-npm-vue3';
import { renderToString } from 'vue/server-renderer';

export default async function server(ctx: any) {
    const app = createApp({
        template: '<div>Admin Page</div>'
    });

    const html = await renderToString(app);
    return html;
}