import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './index.tsx';

const container = document.getElementById('app');
if (container) {
  hydrateRoot(container, React.createElement(App));
}
