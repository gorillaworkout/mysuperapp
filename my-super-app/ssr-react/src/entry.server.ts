import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './index.tsx';

function getPageFromUrl(url) {
  if (url && (url === '/react/about' || url.startsWith('/react/about/'))) {
    return 'about';
  }
  return 'home';
}

export default async function serverEntry(rc) {
  const currentPage = getPageFromUrl(rc.url);
  const html = renderToString(React.createElement(App, { initialPage: currentPage }));
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
  <div id="app">${html}</div>
  ${rc.importmap()}
  ${rc.moduleEntry()}
</body>
</html>`;
}
