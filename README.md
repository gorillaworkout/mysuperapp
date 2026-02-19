# ESMX Super App — Multi-Framework Micro-Frontend with SSR

Production-ready micro-frontend application built on [ESMX Framework v3](https://esmx.dev), implementing the official `@esmx/router` MicroApp architecture pattern with full Server-Side Rendering.

## Why This Is Production-Ready

| Criteria | Status | Detail |
|----------|--------|--------|
| SSR (Server-Side Rendering) | ✅ | Every route renders on the server — SEO-friendly, fast first paint |
| SPA Navigation | ✅ | Client-side transitions between micro-apps without page reload |
| Multi-Framework | ✅ | React 18, Vue 3.5, Vue 2.7 coexist in one app |
| Official ESMX Pattern | ✅ | 100% follows `router-demo` reference implementation |
| Zero CDN Dependency | ✅ | All frameworks bundled locally, no external runtime dependencies |
| Docker/Railway Ready | ✅ | Dockerfile included, `process.env.PORT` supported |
| TypeScript | ✅ | Strict TypeScript across all packages |
| Build Reproducibility | ✅ | Deterministic 3-phase build, no race conditions |

---

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

### System Diagram

```
Browser Request: GET /vue3
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  ssr-hub (Node.js Server)                           │
│                                                     │
│  entry.node.ts                                      │
│  ├── http.createServer()                            │
│  ├── esmx.middleware(req, res)  ← static assets     │
│  └── esmx.render()             ← SSR               │
│          │                                          │
│          ▼                                          │
│  entry.server.ts                                    │
│  ├── createApp({ url: '/vue3' })                    │
│  │   ├── new Router({ routes, apps })               │
│  │   ├── router.replace('/vue3')                    │
│  │   └── router.renderToString()                    │
│  │          │                                       │
│  │          ▼                                       │
│  │   apps.vue3(router) → vue3AppCreator             │
│  │   └── renderToString(app, ssrCtx)                │
│  │          │                                       │
│  │          ▼                                       │
│  │   "<div data-server-rendered>...Vue HTML...</div>"|
│  │                                                  │
│  └── rc.html = <!DOCTYPE html>                      │
│       ├── ${rc.preload()}    ← modulepreload links  │
│       ├── ${rc.css()}        ← stylesheets          │
│       ├── ${html}            ← SSR content          │
│       ├── ${rc.importmap()}  ← ESM import maps      │
│       ├── ${rc.moduleEntry()}← client entry script   │
│       └── ${rc.modulePreload()} ← preload modules   │
│                                                     │
└─────────────────────────────────────────────────────┘
        │
        ▼ Full HTML Response
┌─────────────────────────────────────────────────────┐
│  Browser                                            │
│                                                     │
│  1. Render SSR HTML immediately (fast first paint)  │
│  2. Load entry.client.ts via importmap              │
│  3. createApp({ url }) → new Router(...)            │
│  4. Router hydrates: apps.vue3(router)              │
│     └── app.mount(#app) → finds [data-server-       │
│         rendered] → Vue hydration (no re-render)    │
│  5. App is now interactive                          │
│                                                     │
│  User clicks "React" nav link:                      │
│  1. router.push('/react')                           │
│  2. Router unmounts Vue 3 app                       │
│  3. Router mounts React app (client-side render)    │
│  4. No page reload — SPA transition                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Package Roles

```
esmx-demo/
├── my-super-app/
│   │
│   │── Hub (SSR Orchestrator) ─────────────────────────
│   ├── ssr-hub/                 The brain. Owns the Router,
│   │   ├── entry.node.ts       HTTP server, aggregates all routes,
│   │   ├── entry.server.ts     SSR renders, serves HTML.
│   │   ├── entry.client.ts     Client-side hydration.
│   │   ├── create-app.ts       Router factory (shared SSR + client).
│   │   └── routes.ts           Aggregates routes from all micro-apps.
│   │
│   │── Shared NPM Packages (Framework Providers) ─────
│   ├── ssr-npm-base/            @esmx/router + @esmx/class-state
│   ├── ssr-npm-vue3/            Vue 3 + @esmx/router-vue + app-creator + renderToString
│   ├── ssr-npm-vue2/            Vue 2 + @esmx/router-vue + app-creator + renderToString
│   ├── ssr-npm-react/           React + ReactDOM + @esmx/router-react + app-creator + renderToString
│   │
│   │── Micro-Apps ─────────────────────────────────────
│   ├── ssr-vue3-dashboard/      Vue 3 — Landing page at /
│   ├── ssr-vue3/                Vue 3 — Demo app at /vue3
│   ├── ssr-vue3-ecommerce/      Vue 3 — E-Commerce at /ecommerce
│   ├── ssr-vue3-admin/          Vue 3 — Admin panel at /admin
│   ├── ssr-vue2/                Vue 2 — Demo app at /vue2
│   ├── ssr-react/               React — Demo app at /react
│   └── ssr-react-blog/          React — Blog app at /blog
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
| `/blog` | ssr-react-blog | React 18 | `blog` |
| `/blog/about` | ssr-react-blog | React 18 | `blog` |
| `/vue2` | ssr-vue2 | Vue 2.7 | `vue2` |
| `/vue2/about` | ssr-vue2 | Vue 2.7 | `vue2` |
| `/vue3` | ssr-vue3 | Vue 3.5 | `vue3` |
| `/vue3/about` | ssr-vue3 | Vue 3.5 | `vue3` |
| `/ecommerce` | ssr-vue3-ecommerce | Vue 3.5 | `ecommerce` |
| `/ecommerce/about` | ssr-vue3-ecommerce | Vue 3.5 | `ecommerce` |
| `/admin` | ssr-vue3-admin | Vue 3.5 | `admin` |
| `/admin/settings` | ssr-vue3-admin | Vue 3.5 | `admin` |

### How Routing Works

**Layer 1 — Hub Router** (`ssr-hub/src/create-app.ts`):
- Single `@esmx/router` instance with `apps` object mapping app keys to framework factories
- Determines WHICH micro-app handles each URL prefix
- Calls `mount()` / `unmount()` on micro-apps during transitions

**Layer 2 — Micro-App Routes** (each `micro-app/src/routes.ts`):
- Each micro-app defines its own `RouteConfig[]` with `children` for sub-pages
- Uses `RouterView` component for nested page rendering
- Hub aggregates all routes into one flat array

```typescript
// ssr-vue3/src/routes.ts — defines its own nested routes
export const routes: RouteConfig[] = [{
    path: '/vue3',
    component: App,
    app: 'vue3',
    children: [
        { path: '', component: HomePage },
        { path: 'about', component: AboutPage }
    ]
}];

// ssr-hub/src/routes.ts — aggregates all
export const routes: RouteConfig[] = [
    ...dashboardRoutes, ...reactRoutes, ...blogRoutes,
    ...vue2Routes, ...vue3Routes, ...ecommerceRoutes, ...adminRoutes
];
```

---

## How SSR Works

### Server-Side (First Load)

1. **Request** arrives at `entry.node.ts` → `esmx.middleware()` handles static assets, fallback calls `esmx.render()`
2. **`entry.server.ts`** runs: creates Router with all routes + all framework `renderToString` functions
3. Router matches URL → calls the correct framework's `appCreator` with `renderToString`
4. Framework renders to HTML string → wrapped in `<div data-server-rendered>...</div>`
5. Hub assembles full HTML: `<!DOCTYPE html>` + preloads + CSS + SSR HTML + importmap + module entry
6. Response sent — browser shows content immediately

### Client-Side (Hydration)

1. Browser receives full HTML, renders it (instant first paint)
2. `entry.client.ts` loads via `<script type="module">` resolved through importmap
3. `createApp()` creates Router with same routes + same `apps` factories
4. Router matches current URL → calls `mount(#app)` on the matching micro-app
5. `mount()` finds `[data-server-rendered]` → **hydrates** (attaches event listeners without re-rendering DOM)
6. App is now interactive

### SPA Navigation (Subsequent)

1. User clicks a link → `router.push('/new-route')`
2. Router detects app change → creates new micro-app via `apps[newAppKey](router)`
3. New app's `mount(root)` clears stale DOM → fresh client-side render
4. Old app's `unmount()` cleans up → no memory leaks
5. No page reload, no server roundtrip

---

## Dependency Sharing via Import Maps

ESMX uses native browser [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for dependency deduplication. All micro-apps share the SAME Vue/React instances:

```
Micro-App imports 'vue'
    │
    ▼ Import Map resolves to
ssr-npm-vue3/dist/client/vue.{hash}.final.mjs  (single bundled Vue 3)
    │
    ▼ Scoped imports for
@esmx/router-vue → ssr-npm-vue3/dist/client/@esmx/router-vue.{hash}.final.mjs
```

This means:
- **No duplicate frameworks** — one Vue 3 bundle shared across dashboard, vue3, ecommerce, admin
- **No duplicate React** — one React bundle shared across react, blog
- **Scoped resolution** — Vue 2 and Vue 3 apps each get their own `vue` import via scoped importmaps

---

## Build Process

### 3-Phase Sequential Build

```bash
pnpm build
```

This runs 3 phases in strict order (no race conditions):

```
Phase 1: pnpm --filter './my-super-app/ssr-npm-*' build
         ├── ssr-npm-base    (builds @esmx/router bundle)
         ├── ssr-npm-vue3    (builds Vue 3 + router-vue + app-creator)
         ├── ssr-npm-vue2    (builds Vue 2 + router-vue + app-creator)
         └── ssr-npm-react   (builds React + router-react + app-creator)

Phase 2: pnpm --filter './my-super-app/ssr-*' (micro-apps only) build
         ├── ssr-vue3-dashboard    ├── ssr-react
         ├── ssr-vue3              ├── ssr-react-blog
         ├── ssr-vue3-ecommerce    └── ssr-vue2
         └── ssr-vue3-admin

Phase 3: pnpm --filter ssr-hub build
         └── ssr-hub (links all dist/ outputs, bundles entry points)
```

**Why sequential?** Phase 2 depends on Phase 1 (micro-apps import from npm packages). Phase 3 depends on Phase 2 (hub's `postBuild` hook generates `index.html` from all micro-app outputs).

### Build Output Structure (per package)

```
dist/
├── client/          Browser bundles (served via importmap)
│   ├── src/
│   │   └── entry.client.{hash}.final.mjs
│   └── manifest.json
├── server/          SSR bundles (used by renderToString)
│   ├── src/
│   │   └── entry.server.{hash}.final.mjs
│   └── manifest.json
└── node/            Node.js entry (ESMX config)
    └── src/
        └── entry.node.mjs
```

---

## Deployment

### Railway (Docker)

The included `Dockerfile` handles everything:

```dockerfile
FROM node:24-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY pnpm-lock.yaml* ./
COPY my-super-app/*/package.json ...   # all 12 workspace packages
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

Railway setup:
1. Connect GitHub repo
2. Builder: **Dockerfile** (auto-detected)
3. No environment variables needed (`PORT` is auto-set by Railway)
4. Deploy

The server reads `process.env.PORT` (line 4 of `entry.node.ts`), so it works on any platform that sets `PORT`.

### Manual Server

```bash
NODE_ENV=production pnpm start
# or
NODE_ENV=production PORT=8080 pnpm start
```

---

## Comparison: Before vs After

| Aspect | Before (Old Architecture) | After (ESMX Standard) |
|--------|--------------------------|----------------------|
| Server | `server.mjs` — custom static file server | `esmx start` — official ESMX production server |
| Rendering | SPA only — blank HTML, JS renders everything | Full SSR — server renders HTML, client hydrates |
| SEO | ❌ No content for crawlers | ✅ Full HTML content on first response |
| First Paint | Slow — download JS → parse → render | Fast — HTML rendered immediately |
| Import Maps | Manual `public/index.html` with hardcoded paths | Auto-generated via `rc.importmap()` |
| Entry Points | Manual `post-build.mjs` script to create wrappers | ESMX handles module resolution automatically |
| Router Pattern | Custom `mount`/`unmount` factories | Official `RouteConfig.app` + `RouterView` pattern |
| Micro-App Routes | Manual path-to-component mapping | `routes.ts` with `RouteConfig[]` + `children` |
| Build Order | `pnpm -r --parallel` (race condition possible) | 3-phase sequential build (deterministic) |
| Dashboard | Static HTML toggle in `index.html` | Vue 3 SSR micro-app at `/` |
| Deployment | `node server.mjs` (custom) | `esmx start` (official, `PORT` aware) |
| Dockerfile | Missing packages, wrong CMD | Complete, production-ready |

---

## Tech Stack

| Component | Version |
|-----------|---------|
| ESMX Framework | 3.0.0-rc.107 |
| @esmx/router | 3.0.0-rc.107 |
| @esmx/router-vue | 3.0.0-rc.107 |
| @esmx/router-react | 3.0.0-rc.107 |
| Rspack (bundler) | via @esmx/rspack |
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
pnpm build          # Build all 12 packages + hub (3-phase)
pnpm dev            # Development mode with HMR
pnpm start          # Production server (esmx start)
pnpm clean          # Remove all dist/ directories
```

---

## Conformance to ESMX Official Pattern

This project follows the official [`router-demo`](https://github.com/esmnext/esmx/tree/master/examples/router-demo) reference implementation 1:1, extended with React support and additional micro-apps:

| Pattern | Reference (`router-demo`) | This Project |
|---------|--------------------------|--------------|
| Hub entry files | `entry.node.ts`, `entry.server.ts`, `entry.client.ts` | ✅ Identical pattern |
| `create-app.ts` | Router factory with `apps` object | ✅ Identical pattern (+ React + dashboard) |
| `routes.ts` aggregation | Import routes from micro-apps | ✅ Identical pattern |
| NPM providers | `app-creator.ts` + `render-to-str.ts` | ✅ Identical pattern (+ hydration fix) |
| Micro-app `routes.ts` | `RouteConfig[]` with `app` field + `children` | ✅ Identical pattern |
| Micro-app `index.ts` | `RouterView` component | ✅ Identical pattern |
| Entry files (`entry.client/server`) | `export default {};` | ✅ Identical pattern |
| Vue npm package | `@esmx/rspack-vue` (`createRspackVue3App`) | ✅ Identical |
| Build tool | `esmx build` / `esmx start` | ✅ Identical |

### Additions Beyond Reference

| Addition | Why |
|----------|-----|
| `ssr-npm-react` | React 18 provider (reference only has Vue) |
| `ssr-react`, `ssr-react-blog` | React micro-apps |
| `ssr-vue3-dashboard` | Landing page at `/` |
| `ssr-vue3-ecommerce`, `ssr-vue3-admin` | Additional Vue 3 micro-apps |
| `window.__ESMX_HYDRATED__` guard | Prevents SSR hydration mismatch during SPA transitions between different framework apps |
| `root.innerHTML = ''` cleanup | Clears stale DOM from previous micro-app during SPA navigation |
| 3-phase build script | Prevents race condition in monorepo build order |
