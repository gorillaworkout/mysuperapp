import { createApp } from 'vue';
import { HomePage } from './pages/HomePage';

export function mount(container: HTMLElement) {
  const app = createApp(HomePage);
  app.mount(container);
  
  return {
    unmount: () => {
      app.unmount();
    }
  };
}

export default mount;
