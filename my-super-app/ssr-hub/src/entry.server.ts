import { renderToString } from 'react-dom/server';
import type { RenderContext } from '@esmx/core';

export default async function serverEntry(rc: RenderContext) {
  // Pre-load semua modules
  await import('ssr-react/pages/HomePage.js');
  await import('ssr-vue3/pages/HomePage.js');
  await import('ssr-vue2/pages/HomePage.js');
  
  const html = renderToString(app);
  await rc.commit();
  
  rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESMX Hub</title>
  ${rc.preload()}
  ${rc.css()}
</head>
<body>
  <div id="app">
    <h1>Welcome to ESMX Hub</h1>
    <nav>
      <a href="/react">React App</a>
      <a href="/vue2">Vue 2 App</a>
      <a href="/vue3">Vue 3 App</a>
    </nav>
  </div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
  ${rc.modulePreload()}
</body>
</html>`;
}
