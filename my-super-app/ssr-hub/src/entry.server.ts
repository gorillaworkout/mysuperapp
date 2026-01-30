import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './index.tsx';
import type { RenderContext } from '@esmx/core';

export default async function serverEntry(rc: RenderContext) {
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
