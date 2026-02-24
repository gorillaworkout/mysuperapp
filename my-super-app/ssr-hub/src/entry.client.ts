import { createApp } from './create-app';

const base = location.origin;

createApp({
    base,
    url: location.href
}).then((router) => {
    // Intercept clicks on [data-nav] links for SPA navigation (no page refresh)
    document.addEventListener('click', (e) => {
        const anchor = (e.target as HTMLElement).closest('a[data-nav]');
        if (!anchor) return;
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
        if (e.button !== 0) return;

        e.preventDefault();
        const path = anchor.getAttribute('data-nav') || '/';
        router.push(path);
    });
});
