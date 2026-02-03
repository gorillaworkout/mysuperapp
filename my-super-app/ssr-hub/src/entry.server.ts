import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './index.tsx';
import { createHub } from './hub/index.js';
import { microAppConfigs } from './appConfigs.ts';
import { Router, RouterMode } from '@esmx/router';
import type { RenderContext } from '@esmx/core';

export default async function serverEntry(rc: RenderContext) {
  const router = new Router({
    root: '#app',
    mode: RouterMode.history,
    routes: [
      { path: '/', component: () => null },
      { path: '/react', component: () => null },
      { path: '/vue2', component: () => null },
      { path: '/vue3', component: () => null },
      { path: '/ecommerce', component: () => null },
      { path: '/admin', component: () => null }
    ]
  });

  const hub = createHub(router, {
    defaultContainer: '#app',
    enableSSR: true
  });

  hub.registerMultiple(microAppConfigs);
  
  await import('ssr-react/pages/HomePage.js');
  await import('ssr-vue3/pages/HomePage.js');
  await import('ssr-vue2/pages/HomePage.js');
  
  const html = renderToString(React.createElement(App));
  await rc.commit();
  
  rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESMX Super App - Multi-Framework Hub</title>
  ${rc.preload()}
  ${rc.css()}
</head>
<body>
  <div id="app">${html}</div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
  ${rc.modulePreload()}
</body>
</html>`;
}
