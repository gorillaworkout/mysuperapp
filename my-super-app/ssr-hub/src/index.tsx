import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainLayout } from './layout/MainLayout.tsx';
import { Router } from '@esmx/router';

const router = Router.getInstance();

export function App() {
  return React.createElement(MainLayout);
}

if (typeof window !== 'undefined') {
  const container = document.getElementById('app');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App));
  }
}

export default App;
