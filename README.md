# ESMX Demo - Multi-Framework Micro-Frontend with @esmx/router

Demo project menunjukkan arsitektur **micro-frontend** menggunakan [ESMX Framework](https://esmx.dev) dengan **@esmx/router** untuk routing universal di multiple frameworks (React 18, Vue 2, Vue 3).

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start server
pnpm start
```

Buka: http://localhost:3000

## Project Structure

```
esmx-demo/
├── server.mjs                    # Main server dengan SSR support
├── public/
│   └── index.html                # Landing page dengan Hub Router
└── my-super-app/
    ├── ssr-hub/                  # Hub orchestrator (React-based)
    ├── ssr-react/                # React 18 micro-app (SSR)
    ├── ssr-vue2/                 # Vue 2.7 micro-app (SSR)
    ├── ssr-vue3/                 # Vue 3.5 micro-app
    ├── ssr-vue3-ecommerce/       # E-Commerce micro-app
    ├── ssr-vue3-admin/           # Admin Dashboard micro-app
    ├── ssr-npm-base/             # Shared: @esmx/router
    ├── ssr-npm-react/            # Shared: React + React-DOM + Router React
    ├── ssr-npm-vue2/             # Shared: Vue 2 + Router Vue
    └── ssr-npm-vue3/             # Shared: Vue 3 + Router Vue
```

## Available Routes

| Route | Framework | SSR | Description |
|-------|-----------|-----|-------------|
| `/` | - | - | Landing page dashboard dengan Hub Router |
| `/react` | React 18 | Yes | React micro-app dengan SSR + Hydration |
| `/react/about` | React 18 | Yes | React about page (nested routing) |
| `/vue2` | Vue 2.7 | Yes | Vue 2 micro-app |
| `/vue3` | Vue 3.5 | No | Vue 3 micro-app |
| `/ecommerce` | Vue 3.5 | No | E-Commerce demo |
| `/admin` | Vue 3.5 | No | Admin dashboard |
| `/admin/settings` | Vue 3.5 | No | Admin settings page (nested routing) |

## @esmx/router Features Demonstrated

### 1. Router Modes
```typescript
// SSR Mode (Server-Side)
const router = new Router({
  mode: RouterMode.memory,  // No browser history on server
  routes: [...]
});

// Client Mode
const router = new Router({
  mode: RouterMode.history,  // Browser history API
  routes: [...]
});
```

### 2. Navigation Hooks
```typescript
// Before navigation
router.beforeEach(async (to, from) => {
  // Guard logic, auth checks, etc.
});

// After navigation
router.afterEach((to) => {
  // Analytics, page title updates, etc.
});
```

### 3. RouterProvider Pattern (React)
```typescript
<RouterProvider 
  router={localRouter}      // App-specific router
  sharedRouter={hubRouter}  // Hub router for cross-app navigation
>
  <RouterView />
</RouterProvider>
```

### 4. RouterLink Component
```typescript
// Smart navigation: uses sharedRouter for cross-app, localRouter for in-app
<RouterLink to="/react/about">About Page</RouterLink>
<RouterLink to="/" replace>Dashboard</RouterLink>
```

### 5. Route Configuration
```typescript
const routes = [
  { path: '/react', component: HomePage },
  { path: '/react/about', component: AboutPage },
  { path: '/admin/:rest(.*)', component: null }  // Catch-all
];
```

## Architecture

### DIAMOND Pattern

```
                    server.mjs (Hub)
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
ssr-react           ssr-vue2              ssr-vue3
    │                    │                    │
    └────────────────────┼────────────────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
        ssr-npm-react  ssr-npm-vue2  ssr-npm-vue3
              │          │          │
              └──────────┼──────────┘
                         │
                   ssr-npm-base
                  (@esmx/router)
```

### Key Concepts

- **Hub & Spokes**: Server sebagai hub, micro-apps sebagai spokes
- **Shared Dependencies**: Framework dependencies di-share via `ssr-npm-*` packages
- **Universal Router**: `@esmx/router` digunakan di semua framework
- **SSR Support**: React dan Vue 2 apps menggunakan SSR dengan hydration
- **Import Maps**: Browser-native module resolution tanpa bundling

### How SSR + Router Works

```
1. Browser Request (/react/about)
       ↓
2. Server creates Router with memory mode
       ↓
3. router.replace('/react/about') - navigate to URL
       ↓
4. renderToString() - render matched component
       ↓
5. Server returns full HTML
       ↓
6. Browser shows content immediately (SSR)
       ↓
7. Client loads hydrate.mjs
       ↓
8. hydrateRoot() + Router(history mode)
       ↓
9. App becomes interactive with client-side navigation
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | ESMX v3 |
| Router | @esmx/router v3 |
| Bundler | Rspack |
| Runtime | Node.js 24+ |
| Package Manager | pnpm |
| React | 18.3.1 |
| Vue 2 | 2.7.x |
| Vue 3 | 3.5.x |

## Scripts

```bash
pnpm build    # Build all packages
pnpm dev      # Development mode
pnpm clean    # Clean build artifacts
pnpm start    # Start production server
```

## Import Maps

Server menggunakan import maps untuk resolve dependencies:

```html
<script type="importmap">{
  "imports": {
    "react": "/my-super-app/ssr-npm-react/dist/client/react.mjs",
    "react-dom": "/my-super-app/ssr-npm-react/dist/client/react-dom.mjs",
    "@esmx/router": "/my-super-app/ssr-npm-base/dist/client/@esmx/router/index.mjs",
    "ssr-npm-react": "/my-super-app/ssr-npm-react/dist/client/src/index.mjs"
  },
  "scopes": {
    "/my-super-app/ssr-npm-vue3/": {
      "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs"
    }
  }
}</script>
```

## Shared Router Implementation

### ssr-npm-react (React Router Bindings)

```typescript
// Exports from ssr-npm-react/src/index.ts
export { Router, RouterMode } from '@esmx/router';
export { RouterProvider, RouterView, RouterLink, useRouter, useRoute } from './router-react';
```

### ssr-npm-vue3 (Vue Router Bindings)

```typescript
// Uses @esmx/router-vue for Vue 3 integration
export { Router, RouterMode, install } from '@esmx/router-vue';
```

## Package Dependencies

| Package | Dependencies |
|---------|-------------|
| `ssr-npm-base` | `@esmx/router` |
| `ssr-npm-react` | `react`, `react-dom`, `@esmx/router`, `ssr-npm-base` |
| `ssr-npm-vue3` | `vue`, `@esmx/router`, `@esmx/router-vue`, `ssr-npm-base` |
| `ssr-react` | `ssr-npm-react` |
| `ssr-vue3-admin` | `ssr-npm-vue3`, `ssr-npm-base` |

---

**Version**: 5.0  
**Last Updated**: February 9, 2026  
**Focus**: @esmx/router Demo
