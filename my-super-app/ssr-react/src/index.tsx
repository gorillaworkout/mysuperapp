import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.js';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<HomePage />);
}

export { HomePage };
