import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.tsx';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(HomePage));
}

export { HomePage };
