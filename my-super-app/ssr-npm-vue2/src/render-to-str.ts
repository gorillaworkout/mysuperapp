import { createRenderer } from 'vue-server-renderer';

const renderer = createRenderer();

export async function renderToString(
    app: unknown,
    _context: Record<string, unknown>
): Promise<string> {
    const html = await renderer.renderToString(app);
    return `<div id="root">${html}</div>`;
}
