import type { IncomingMessage } from 'node:http';
import type { RenderContext } from '@esmx/core';
import { renderToString as reactRenderToStr } from 'ssr-npm-react/src/render-to-str';
import { renderToString as vue2RenderToStr } from 'ssr-npm-vue2/src/render-to-str';
import { renderToString as vue3RenderToStr } from 'ssr-npm-vue3/src/render-to-str';
import { createApp } from './create-app';

export default async (rc: RenderContext) => {
    const req = rc.params.req as IncomingMessage | undefined;
    const protocol = req?.headers['x-forwarded-proto'] || 'http';
    const host = req?.headers.host || 'localhost:3000';
    const ssrCtx: Record<string, unknown> = {
        importMetaSet: rc.importMetaSet
    };

    const router = await createApp({
        base: `${protocol}://${host}`,
        url: req?.url ?? '/',
        reactRenderToStr,
        vue2RenderToStr,
        vue3RenderToStr,
        ssrCtx
    });

    const html = await router.renderToString();
    await rc.commit();

    rc.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESMX Super App - Micro-Frontend Hub</title>
  ${rc.preload()}
  ${rc.css()}
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      margin: 0;
      min-height: 100vh;
    }
    header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-inner {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #111827;
      text-decoration: none;
    }
    .logo:hover { color: #2563eb; }
    nav { display: flex; gap: 0.25rem; }
    nav a {
      padding: 0.5rem 1rem;
      color: #4b5563;
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    nav a:hover { color: #2563eb; background: #f3f4f6; }
    nav a.active { color: #2563eb; background: #eff6ff; }
    .container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    #app { min-height: 400px; }
    footer {
      background: #111827;
      color: #9ca3af;
      padding: 2rem 1rem;
      text-align: center;
      margin-top: 3rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="/" class="logo" data-nav="/">ESMX Super App</a>
      <nav>
        <a href="/react" data-nav="/react">React</a>
        <a href="/blog" data-nav="/blog">React Blog</a>
        <a href="/vue2" data-nav="/vue2">Vue 2</a>
        <a href="/vue3" data-nav="/vue3">Vue 3</a>
        <a href="/ecommerce" data-nav="/ecommerce">E-Commerce</a>
        <a href="/admin" data-nav="/admin">Admin</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div id="app">${html ?? ''}</div>
  </div>

  <footer>
    Built with ESMX Federation &bull; @esmx/router MicroApp Architecture
  </footer>

  ${rc.importmap()}
  ${rc.moduleEntry()}
  ${rc.modulePreload()}
</body>
</html>`;
};
