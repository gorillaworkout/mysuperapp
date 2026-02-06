import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './index';

function getPageFromUrl(url) {
  if (url && (url === '/react/about' || url.startsWith('/react/about/'))) {
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
      { path: '/react', component: HomePage },
      { path: '/react/about', component: AboutPage }
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
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
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
