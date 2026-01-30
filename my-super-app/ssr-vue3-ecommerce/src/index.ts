import { createApp } from 'vue';
import { HomePage } from './pages/HomePage.js';

export function mount(container: HTMLElement) {
    const app = createApp(HomePage);
    app.mount(container);
    return app;
}

export function unmount(app: any) {
    app.unmount();
}

export { HomePage };