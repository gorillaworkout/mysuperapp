import { renderToString as renderer } from '@vue/server-renderer';

export async function renderToString(
    app: unknown,
    context: Record<string, unknown>
): Promise<string> {
    const html = await renderer(app as Parameters<typeof renderer>[0], context);
    const teleports = (context as Record<string, Record<string, string>>)
        .teleports;
    return `${teleports?.body || ''}<div id="root"><div data-server-rendered>${
        html
    }</div></div><div id="teleported">${
        teleports?.['#teleported'] ?? ''
    }</div>`;
}
