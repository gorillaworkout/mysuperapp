import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './index';

const container = document.getElementById('app');
if (container) {
  hydrateRoot(container, React.createElement(App));
}
