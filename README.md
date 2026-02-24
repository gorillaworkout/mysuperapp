# ESMX Super App — Multi-Framework Micro-Frontend with SSR

Production-ready micro-frontend application built on [ESMX Framework v3](https://esmx.dev), implementing the official `@esmx/router` MicroApp architecture pattern with full Server-Side Rendering.

## Quick Start

```bash
pnpm install
pnpm build
pnpm start
```

Open: http://localhost:3000

---

## Architecture

### How It Works (One Sentence)

**One `@esmx/router` instance in `ssr-hub` controls which micro-app (React/Vue 2/Vue 3) gets mounted into `#app`, with full SSR on first load and SPA navigation on subsequent clicks.**

### Package Structure

```
esmx-demo/
├── my-super-app/
│   │
│   │── Hub (SSR Orchestrator) ─────────────────────────
│   ├── ssr-hub/                 The brain. Owns the Router,
│   │   ├── entry.node.ts       HTTP server, aggregates all routes,
│   │   ├── entry.server.ts     SSR renders, serves HTML.
│   │   ├── entry.client.ts     Client-side hydration + SPA nav.
│   │   ├── create-app.ts       Router factory (shared SSR + client).
│   │   └── routes.ts           Aggregates routes from all micro-apps.
│   │
│   │── Shared NPM Packages (Framework Providers) ─────
│   ├── ssr-npm-base/            @esmx/router + @esmx/class-state
│   ├── ssr-npm-vue3/            Vue 3 provider:
│   │   ├── app-creator.ts       - creates Vue 3 app + mount/unmount/renderToString
│   │   └── render-to-str.ts     - imports @vue/server-renderer (SERVER ONLY)
│   ├── ssr-npm-vue2/            Vue 2 provider:
│   │   ├── app-creator.ts       - creates Vue 2 app + mount/unmount/renderToString
│   │   └── render-to-str.ts     - imports vue-server-renderer (SERVER ONLY)
│   └── ssr-npm-react/           React provider:
│       ├── app-creator.ts       - creates React app + mount/unmount/renderToString
│       └── render-to-str.ts     - imports react-dom/server (SERVER ONLY)
│   │
│   │── Micro-Apps ─────────────────────────────────────
│   ├── ssr-vue3-dashboard/      Vue 3 — Landing page at /
│   ├── ssr-vue3/                Vue 3 — Demo app at /vue3
│   ├── ssr-vue2/                Vue 2 — Demo app at /vue2
│   ├── ssr-react/               React — Demo app at /react
│   └── ssr-share/               Shared state (cross-framework)
│
├── Dockerfile                   Production Docker image
├── .dockerignore
├── package.json                 Root workspace scripts
├── pnpm-workspace.yaml          Workspace package list
└── .npmrc                       pnpm configuration
```

---

## Routing

### Route Table

| URL | Micro-App | Framework | App Key |
|-----|-----------|-----------|---------|
| `/` | ssr-vue3-dashboard | Vue 3.5 | `dashboard` |
| `/react` | ssr-react | React 18 | `react` |
| `/react/about` | ssr-react | React 18 | `react` |
| `/vue2` | ssr-vue2 | Vue 2.7 | `vue2` |
| `/vue2/about` | ssr-vue2 | Vue 2.7 | `vue2` |
| `/vue3` | ssr-vue3 | Vue 3.5 | `vue3` |
| `/vue3/about` | ssr-vue3 | Vue 3.5 | `vue3` |

---

## 🔑 renderToString Architecture (IMPORTANT)

### The Problem

`vue-server-renderer`, `@vue/server-renderer`, and `react-dom/server` are **server-only Node.js modules**. They CANNOT be imported in files that also get bundled for the client/browser — the build will fail.

### The Solution: Parameter Injection Pattern

`renderToString` lives in dedicated `render-to-str.ts` files (one per framework). These files are ONLY imported from `entry.server.ts` — which is a server-only entry point that never gets bundled for the browser.

The `app-creator.ts` files receive `renderToString` as a **parameter** instead of importing it directly. This keeps `app-creator.ts` safe for both server AND client bundles.

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ SERVER ONLY (never bundled for browser)                     │
│                                                             │
│ render-to-str.ts ─── imports server-only module             │
│ (ssr-npm-vue3)       (@vue/server-renderer)                 │
│ (ssr-npm-vue2)       (vue-server-renderer)                  │
│ (ssr-npm-react)      (react-dom/server)                     │
│        │                                                    │
│        ▼                                                    │
│ entry.server.ts ─── imports all 3 renderToString functions  │
│        │                                                    │
│        ▼                                                    │
│ createApp({ reactRenderToStr, vue2RenderToStr, vue3Render.. │
│        │                                                    │
│        ▼                                                    │
│ create-app.ts ─── passes renderToString as parameter to     │
│        │          each appCreator function                   │
│        │                                                    │
│        ▼                                                    │
│ app-creator.ts ─── receives renderToString as parameter     │
│                    calls it only during SSR                  │
│                    ⚠️ Does NOT import render-to-str.ts!      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CLIENT (browser bundle)                                     │
│                                                             │
│ entry.client.ts ─── imports createApp (no renderToString!)  │
│        │                                                    │
│        ▼                                                    │
│ createApp({ base, url })                                    │
│        │            ↑ no renderToStr params = safe for      │
│        ▼              browser bundle                        │
│ create-app.ts ─── passes undefined to appCreator            │
│        │                                                    │
│        ▼                                                    │
│ app-creator.ts ─── renderToString is undefined              │
│                    mount() does hydration/client render      │
│                    renderToString() returns '' (no-op)       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why NOT import renderToString directly in app-creator.ts?

```typescript
// ❌ WRONG — will break the client bundle build!
// app-creator.ts
import { renderToString } from './render-to-str';
// → render-to-str.ts imports 'vue-server-renderer'
// → vue-server-renderer is Node.js only
// → client bundle tries to include it → BUILD ERROR

// ✅ CORRECT — parameter injection, safe for both bundles
// app-creator.ts
export const appCreator = (router, { renderToString }) => {
    // renderToString is passed from entry.server.ts (server)
    // or undefined from entry.client.ts (browser)
    return {
        async renderToString() {
            if (typeof renderToString !== 'function') return '';
            return renderToString(app, ssrCtx);
        }
    };
};
```

### File-by-File Summary

| File | Role | Imports server modules? |
|------|------|------------------------|
| `ssr-npm-*/render-to-str.ts` | Wraps framework's renderToString | ✅ YES (server-only) |
| `ssr-npm-*/app-creator.ts` | Creates framework app (mount/unmount/SSR) | ❌ NO (parameter only) |
| `ssr-hub/entry.server.ts` | Server entry — imports render-to-str, passes to createApp | ✅ YES (server-only) |
| `ssr-hub/entry.client.ts` | Client entry — calls createApp WITHOUT renderToString | ❌ NO (browser-safe) |
| `ssr-hub/create-app.ts` | Router factory — passes renderToString params to appCreators | ❌ NO (shared server+client) |

---

## How SSR Works

### Server-Side (First Load)

1. **Request** arrives at `entry.node.ts` → `esmx.middleware()` handles static assets, fallback calls `esmx.render()`
2. **`entry.server.ts`** runs: imports `renderToString` from all 3 `render-to-str.ts` files, calls `createApp()`
3. `createApp()` creates Router with all routes + passes `renderToString` functions to each `appCreator`
4. Router matches URL → calls the correct framework's `appCreator`
5. `appCreator.renderToString()` calls the injected function → framework renders to HTML string
6. Hub assembles full HTML: `<!DOCTYPE html>` + preloads + CSS + SSR HTML + importmap + module entry
7. Response sent — browser shows content immediately

### Client-Side (Hydration)

1. Browser receives full HTML, renders it (instant first paint)
2. `entry.client.ts` loads → calls `createApp()` **without** renderToString params
3. Router matches current URL → calls `mount(#app)` on the matching micro-app
4. `mount()` finds `[data-server-rendered]` → **hydrates** (attaches event listeners without re-rendering DOM)
5. App is now interactive

### SPA Navigation (Subsequent)

1. User clicks a link with `data-nav` attribute → `router.push('/new-route')`
2. Router detects app change → creates new micro-app via `apps[newAppKey](router)`
3. New app's `mount(root)` clears stale DOM → fresh client-side render
4. Old app's `unmount()` cleans up → no memory leaks
5. No page reload, no server roundtrip

---

## Build Process

### 3-Phase Sequential Build

```bash
pnpm build
```

Runs 3 phases in strict order:

```
Phase 1: pnpm --filter './my-super-app/ssr-npm-*' build
         ├── ssr-npm-base    (builds @esmx/router bundle)
         ├── ssr-npm-vue3    (builds Vue 3 + router-vue + app-creator)
         ├── ssr-npm-vue2    (builds Vue 2 + router-vue + app-creator)
         └── ssr-npm-react   (builds React + router-react + app-creator)

Phase 2: pnpm --filter './my-super-app/ssr-*' (micro-apps) build
         ├── ssr-vue3-dashboard    ├── ssr-react
         ├── ssr-vue3              ├── ssr-vue2
         └── ssr-share

Phase 3: pnpm --filter ssr-hub build
         └── ssr-hub (links all dist/ outputs, bundles entry points)
```

**Why sequential?** Phase 2 depends on Phase 1 (micro-apps import from npm packages). Phase 3 depends on Phase 2 (hub aggregates all micro-app outputs).

---

## Deployment

### Docker

```bash
docker build -t mysuperapp .
docker run -d --name mysuperapp -p 3000:3000 mysuperapp
```

### Manual

```bash
NODE_ENV=production pnpm start
# or
NODE_ENV=production PORT=8080 pnpm start
```

---

## Dependency Sharing via Import Maps

ESMX uses native browser [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for dependency deduplication:

- **No duplicate frameworks** — one Vue 3 bundle shared across dashboard + vue3 apps
- **No duplicate React** — one React bundle for all React apps
- **Scoped resolution** — Vue 2 and Vue 3 apps each get their own `vue` import

---

## Tech Stack

| Component | Version |
|-----------|---------|
| ESMX Framework | 3.0.0-rc.112 |
| @esmx/router | 3.0.0-rc.112 |
| Node.js | 24+ |
| pnpm | 10+ |
| React | 18.x |
| Vue 3 | 3.5.x |
| Vue 2 | 2.7.x |
| TypeScript | 5.x |

---

## Scripts

```bash
pnpm install        # Install all workspace dependencies
pnpm build          # Build all packages + hub (3-phase)
pnpm dev            # Development mode with HMR
pnpm start          # Production server (esmx start)
pnpm clean          # Remove all dist/ directories
```

---

## Conformance to ESMX Official Pattern

This project follows the official [`router-demo`](https://github.com/esmnext/esmx/tree/master/examples/router-demo) reference implementation, extended with React support:

| Pattern | Reference (`router-demo`) | This Project |
|---------|--------------------------|--------------|
| Hub entry files | `entry.node/server/client.ts` | ✅ Identical |
| `create-app.ts` | Router factory with `apps` object | ✅ Identical (+ React) |
| `routes.ts` aggregation | Import routes from micro-apps | ✅ Identical |
| NPM providers | `app-creator.ts` + `render-to-str.ts` | ✅ Identical |
| renderToString injection | Parameter from entry.server → appCreator | ✅ Identical |
| Micro-app `routes.ts` | `RouteConfig[]` with `app` + `children` | ✅ Identical |
| Build tool | `esmx build` / `esmx start` | ✅ Identical |

### Additions Beyond Reference

| Addition | Why |
|----------|-----|
| `ssr-npm-react` | React 18 provider (reference only has Vue) |
| `ssr-react` | React micro-app |
| `ssr-vue3-dashboard` | Landing page at `/` |
| `ssr-share` | Cross-framework shared state |
| `window.__ESMX_HYDRATED__` guard | Prevents SSR hydration mismatch during SPA transitions |
| `data-nav` click interceptor | SPA navigation for logo/header links |
| 3-phase build script | Prevents race condition in monorepo build order |
