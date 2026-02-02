import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.tsx';

export function mount(container: HTMLElement) {
  const root = createRoot(container);
  root.render(React.createElement(HomePage));
  
  return {
    unmount: () => {
      root.unmount();
    }
  };
}

export default mount;

export { HomePage };
