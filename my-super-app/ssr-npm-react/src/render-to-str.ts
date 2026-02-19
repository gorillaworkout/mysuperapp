import type { ReactElement } from 'react';
import { renderToString as reactRenderToString } from 'react-dom/server';

export function renderToString(element: ReactElement): string {
    return reactRenderToString(element);
}
