import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './index';

function getPageFromUrl(url) {
  if (url && (url === '/blog/about' || url.startsWith('/blog/about/'))) {
    return 'about';
  }
  return 'home';
}

export default async function serverEntry(rc) {
  // Create a new Router instance for SSR
  // Create a new Router instance for SSR
  const { Router, RouterMode } = await import('@esmx/router');
  const { HomePage, AboutPage } = await import('./index');

  const router = new Router({
    mode: RouterMode.memory,
    routes: [
      { path: '/blog', component: HomePage },
      { path: '/blog/about', component: AboutPage }
    ]
  });

  // Initial navigation
  console.log(`[SSR-React] Navigating to: ${rc.url}`);
  await router.replace(rc.url);
  console.log(`[SSR-React] Current route:`, router.route?.path);

  const html = renderToString(React.createElement(App, { router }));
  console.log(`[SSR-React] Rendered HTML length: ${html.length}`);
  await rc.commit();

  rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React SSR</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      margin: 0;
      min-height: 100vh;
    }
  </style>
  ${rc.preload()}
  ${rc.css()}
</head>
<body>
  <div id="micro-app-mount">${html}</div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
</body>
</html>`;
}
