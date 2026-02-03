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
