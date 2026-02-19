import type { Router, RouterMicroAppOptions } from '@esmx/router';
import { RouterProvider, RouterView } from '@esmx/router-react';
import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

declare global {
    interface Window {
        __ESMX_HYDRATED__?: boolean;
    }
}

export interface AppCreatorOptions {
    renderToString?: (element: React.ReactElement) => string;
}

export const appCreator = (
    router: Router,
    { renderToString }: AppCreatorOptions = {}
): RouterMicroAppOptions => {
    let root: ReturnType<typeof createRoot> | null = null;
    let reactContainer: HTMLDivElement | null = null;

    const appElement = React.createElement(
        RouterProvider,
        { router },
        React.createElement(RouterView)
    );

    return {
        mount(el) {
            const ssrEl =
                typeof window !== 'undefined' && !window.__ESMX_HYDRATED__
                    ? el.querySelector('[data-server-rendered]')
                    : null;
            if (typeof window !== 'undefined') {
                window.__ESMX_HYDRATED__ = true;
            }
            if (ssrEl) {
                root = hydrateRoot(ssrEl, appElement);
            } else {
                el.innerHTML = '';
                reactContainer = document.createElement('div');
                el.appendChild(reactContainer);
                root = createRoot(reactContainer);
                root.render(appElement);
            }
        },
        unmount() {
            root?.unmount();
            root = null;
            reactContainer?.remove();
            reactContainer = null;
        },
        async renderToString() {
            if (typeof renderToString !== 'function') return '';
            return `<div data-server-rendered>${renderToString(appElement)}</div>`;
        }
    };
};
