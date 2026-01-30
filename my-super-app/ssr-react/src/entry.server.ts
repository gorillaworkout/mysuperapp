import React from 'react';
import { renderToString } from 'react-dom/server';
import { HomePage } from './pages/HomePage.tsx';
import type { RenderContext } from '@esmx/core';

export default async function serverEntry(rc: RenderContext) {
  const html = renderToString(React.createElement(HomePage));
  await rc.commit();
  
  rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React SSR</title>
  ${rc.preload()}
  ${rc.css()}
</head>
<body>
  <div id="app">${html}</div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
</body>
</html>`;
}
