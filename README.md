# ESMX Demo - Micro-Frontend with @esmx/router MicroApp

Demo project micro-frontend menggunakan [ESMX Framework](https://esmx.dev) dan sistem **MicroApp** bawaan `@esmx/router` (`RouteConfig.app` + `RouterOptions.apps`).

**Tanpa CDN** — semua dependency di-bundle dan di-serve secara lokal.

---

## Quick Start

```bash
pnpm install
pnpm build
pnpm start
```

Buka: http://localhost:3000

---

## Arsitektur Sistem

### Overview

```
┌──────────────────────────────────────────────────────────┐
│  Browser                                                  │
│                                                           │
│  public/index.html (Hub)                                  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  <script type="importmap">                          │  │
│  │    Semua modul di-resolve ke file lokal              │  │
│  │    /my-super-app/*/dist/client/...                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  new Router({                                       │  │
│  │    routes: [                                        │  │
│  │      { path: '/' },              ← Dashboard        │  │
│  │      { path: '/react', app: 'react' },              │  │
│  │      { path: '/vue2',  app: 'vue2' },               │  │
│  │      { path: '/vue3',  app: 'vue3' },               │  │
│  │      ...                                            │  │
│  │    ],                                               │  │
│  │    apps: {                                          │  │
│  │      react: (router) => reactModule.createApp(router) │
│  │      vue2:  (router) => vue2Module.createApp(router)  │
│  │      vue3:  (router) => vue3Module.createApp(router)  │
│  │      ...                                            │  │
│  │    }                                                │  │
│  │  })                                                 │  │
│  └─────────────────────────────────────────────────────┘  │
│         │                                                 │
│         │  route berubah → MicroApp._update()             │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  #app container                                     │  │
│  │  ┌───────────────────────────────────────────────┐  │  │
│  │  │  Micro-app yang aktif di-mount disini         │  │  │
│  │  │  (React 18, Vue 2.7, atau Vue 3.5)            │  │  │
│  │  └───────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Satu Router, Banyak Framework

Sistem ini menggunakan **satu instance `@esmx/router`** yang dibuat di hub (`public/index.html`). Router ini mengontrol seluruh navigasi — tidak ada router lokal di masing-masing micro-app.

**Alur kerja:**

1. User klik link → `router.push('/react')`
2. Router mencocokkan route `{ path: '/react', app: 'react' }`
3. `MicroApp._update()` dipanggil secara internal oleh `@esmx/router`
4. Jika micro-app belum pernah dimuat: panggil `apps.react(router)` → dapat `{ mount, unmount }`
5. `mount(#app)` → React app di-render ke dalam `#app`
6. User navigasi ke `/vue3` → `unmount()` React, `mount()` Vue 3

**Hasilnya:** navigasi antar framework tanpa full page reload.

---

## Struktur Project

```
esmx-demo/
├── server.mjs                         # SPA server (Node.js HTTP)
├── public/
│   └── index.html                     # Hub: importmap + Router + UI
├── scripts/
│   └── post-build.mjs                 # Post-build: buat stable entry points
└── my-super-app/
    │
    │── Micro-Apps ─────────────────────
    ├── ssr-react/                      # React 18 micro-app
    ├── ssr-react-blog/                 # React Blog micro-app
    ├── ssr-vue2/                       # Vue 2.7 micro-app
    ├── ssr-vue3/                       # Vue 3.5 micro-app
    ├── ssr-vue3-ecommerce/             # Vue 3.5 E-Commerce micro-app
    ├── ssr-vue3-admin/                 # Vue 3.5 Admin Dashboard micro-app
    │
    │── Shared Packages ────────────────
    ├── ssr-npm-base/                   # @esmx/router + @esmx/class-state
    ├── ssr-npm-react/                  # React + ReactDOM + @esmx/router-react
    ├── ssr-npm-vue2/                   # Vue 2.7 + @esmx/router-vue
    ├── ssr-npm-vue3/                   # Vue 3.5 + @esmx/router-vue
    │
    │── Hub ────────────────────────────
    └── ssr-hub/                        # Build config (links semua package)
```

---

## Routes

| Route | Framework | Micro-App | Deskripsi |
|-------|-----------|-----------|-----------|
| `/` | — | — | Dashboard (HTML statis di hub) |
| `/react` | React 18 | `ssr-react` | React micro-app |
| `/react/about` | React 18 | `ssr-react` | React nested page |
| `/blog` | React 18 | `ssr-react-blog` | Blog micro-app |
| `/blog/about` | React 18 | `ssr-react-blog` | Blog nested page |
| `/vue2` | Vue 2.7 | `ssr-vue2` | Vue 2 micro-app |
| `/vue2/about` | Vue 2.7 | `ssr-vue2` | Vue 2 nested page |
| `/vue3` | Vue 3.5 | `ssr-vue3` | Vue 3 micro-app |
| `/vue3/about` | Vue 3.5 | `ssr-vue3` | Vue 3 nested page |
| `/ecommerce` | Vue 3.5 | `ssr-vue3-ecommerce` | E-Commerce demo |
| `/admin` | Vue 3.5 | `ssr-vue3-admin` | Admin dashboard |
| `/admin/settings` | Vue 3.5 | `ssr-vue3-admin` | Admin settings page |

---

## Cara Kerja Detail

### 1. Hub Router (`public/index.html`)

Hub adalah satu-satunya file HTML. Dia berisi:

#### a) Import Map — Resolusi Modul (Lokal, Tanpa CDN)

```json
{
  "imports": {
    "react": "/my-super-app/ssr-npm-react/dist/client/react.mjs",
    "react-dom": "/my-super-app/ssr-npm-react/dist/client/react-dom.mjs",
    "react-dom/client": "/my-super-app/ssr-npm-react/dist/client/react-dom/client.mjs",
    "@esmx/router": "/my-super-app/ssr-npm-base/dist/client/@esmx/router/index.mjs",
    "ssr-npm-base": "/my-super-app/ssr-npm-base/dist/client/index.mjs",
    "ssr-npm-react": "/my-super-app/ssr-npm-react/dist/client/src/index.mjs",
    "ssr-npm-vue2": "/my-super-app/ssr-npm-vue2/dist/client/src/index.mjs",
    "ssr-npm-vue3": "/my-super-app/ssr-npm-vue3/dist/client/src/index.mjs"
  },
  "scopes": {
    "/my-super-app/ssr-npm-react/": {
      "@esmx/router-react": "/my-super-app/ssr-npm-react/dist/client/@esmx/router-react.mjs"
    },
    "/my-super-app/ssr-npm-vue3/": {
      "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs",
      "@esmx/router-vue": "/my-super-app/ssr-npm-vue3/dist/client/@esmx/router-vue.mjs"
    },
    "/my-super-app/ssr-npm-vue2/": {
      "vue": "/my-super-app/ssr-npm-vue2/dist/client/vue.mjs",
      "@esmx/router-vue": "/my-super-app/ssr-npm-vue2/dist/client/@esmx/router-vue.mjs"
    },
    "/my-super-app/ssr-vue2/": {
      "vue": "/my-super-app/ssr-npm-vue2/dist/client/vue.mjs"
    },
    "/my-super-app/ssr-vue3/": {
      "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs"
    },
    "/my-super-app/ssr-vue3-ecommerce/": {
      "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs"
    },
    "/my-super-app/ssr-vue3-admin/": {
      "vue": "/my-super-app/ssr-npm-vue3/dist/client/vue.mjs"
    }
  }
}
```

**Kenapa pakai scopes?** Karena tiap shared package mungkin punya internal dependency yang harus di-resolve secara berbeda. Contoh: `ssr-npm-react` butuh `@esmx/router-react`, tapi cuma di scope `ssr-npm-react` — bukan global.

#### b) Module Loading — Parallel Import

```javascript
const [
  reactModule, blogModule, vue2Module,
  vue3Module, ecommerceModule, adminModule
] = await Promise.all([
  import('/my-super-app/ssr-react/dist/client/src/index.mjs'),
  import('/my-super-app/ssr-react-blog/dist/client/src/index.mjs'),
  import('/my-super-app/ssr-vue2/dist/client/src/index.mjs'),
  import('/my-super-app/ssr-vue3/dist/client/src/index.mjs'),
  import('/my-super-app/ssr-vue3-ecommerce/dist/client/src/index.mjs'),
  import('/my-super-app/ssr-vue3-admin/dist/client/src/index.mjs')
]);
```

Semua 6 micro-app di-load **paralel** saat page pertama kali dibuka. Ditambah `<link rel="modulepreload">` di `<head>` supaya browser sudah mulai download sebelum script berjalan.

#### c) Router Configuration

```javascript
const router = new Router({
  root: appContainer,          // <div id="app">
  mode: RouterMode.history,    // History API (bukan hash)
  routes: [
    { path: '/' },                                    // Dashboard (no app)
    { path: '/react', app: 'react' },                 // Exact match
    { path: '/react/:rest(.*)', app: 'react' },        // Catch-all untuk nested routes
    { path: '/blog', app: 'blog' },
    { path: '/blog/:rest(.*)', app: 'blog' },
    { path: '/vue2', app: 'vue2' },
    { path: '/vue2/:rest(.*)', app: 'vue2' },
    { path: '/vue3', app: 'vue3' },
    { path: '/vue3/:rest(.*)', app: 'vue3' },
    { path: '/ecommerce', app: 'ecommerce' },
    { path: '/ecommerce/:rest(.*)', app: 'ecommerce' },
    { path: '/admin', app: 'admin' },
    { path: '/admin/:rest(.*)', app: 'admin' }
  ],
  apps: {
    react:     (router) => reactModule.createApp(router),
    blog:      (router) => blogModule.createApp(router),
    vue2:      (router) => vue2Module.createApp(router),
    vue3:      (router) => vue3Module.createApp(router),
    ecommerce: (router) => ecommerceModule.createApp(router),
    admin:     (router) => adminModule.createApp(router)
  }
});
```

**Pola route:** Tiap micro-app punya 2 route:
- Exact: `/react` — root page
- Catch-all: `/react/:rest(.*)` — semua sub-path (e.g. `/react/about`, `/react/settings/profile`)

Keduanya mengarah ke `app: 'react'` yang sama. Micro-app sendiri yang menentukan komponen mana yang di-render berdasarkan `router.route.path`.

#### d) Dashboard Toggle

```javascript
router.afterEach((to) => {
  const isDashboard = to.path === '/';
  dashboard.style.display = isDashboard ? 'block' : 'none';
});
```

Route `/` tidak punya `app`, jadi tidak ada micro-app yang di-mount. Dashboard (`<div id="dashboard">`) ditampilkan/disembunyikan berdasarkan path.

---

### 2. Micro-App Factory Pattern

Setiap micro-app mengeksport fungsi `createApp(router)` yang mengembalikan `{ mount(el), unmount() }`.

#### React Micro-App (`ssr-react/src/index.ts`)

```typescript
import { React, RouterProvider, useRoute } from 'ssr-npm-react';
import { createRoot } from 'react-dom/client';
import type { Router } from '@esmx/router';

const routes: Record<string, React.ComponentType> = {
  '/react': HomePage,
  '/react/about': AboutPage
};

function AppView() {
  const currentRoute = useRoute();               // dari @esmx/router-react
  const Component = routes[currentRoute.path] || HomePage;
  return React.createElement(Component);
}

export function App({ router }: { router: Router }) {
  return React.createElement(
    RouterProvider,                                // dari @esmx/router-react
    { router, children: React.createElement(AppView) }
  );
}

export function createApp(router: Router) {
  let root = null;
  return {
    mount(el: HTMLElement) {
      root = createRoot(el);
      root.render(React.createElement(App, { router }));
    },
    unmount() {
      root?.unmount();
      root = null;
    }
  };
}
```

**Poin penting:**
- `RouterProvider` dari `@esmx/router-react` (official package) — menerima router instance dari hub
- `useRoute()` mengembalikan reactive route — otomatis re-render ketika path berubah
- `routes` adalah simple path → component mapping, micro-app tentukan sendiri page mana yang ditampilkan
- `mount()` **tidak** memanggil `el.innerHTML = ''` — MicroApp yang mengurus lifecycle container

#### Vue 3 Micro-App (`ssr-vue3/src/index.ts`)

```typescript
import { createApp as createVueApp, h, defineComponent } from 'ssr-npm-vue3';
import { RouterPlugin, useProvideRouter, useRoute } from 'ssr-npm-vue3';
import type { Router } from '@esmx/router';

const routes: Record<string, any> = {
  '/vue3': HomePage,
  '/vue3/about': AboutPage
};

const AppView = defineComponent({
  setup() {
    const route = useRoute();                     // dari @esmx/router-vue
    return () => {
      const Component = routes[route?.path] || HomePage;
      return h(Component);
    };
  }
});

function createRootComponent(router: Router) {
  return defineComponent({
    name: 'Root',
    setup() {
      useProvideRouter(router);                   // inject router ke Vue app tree
      return () => h(App);
    }
  });
}

export function createApp(router: Router) {
  let app = null;
  return {
    mount(el: HTMLElement) {
      const vueContainer = document.createElement('div');
      el.appendChild(vueContainer);
      app = createVueApp(createRootComponent(router));
      app.use(RouterPlugin);                      // dari @esmx/router-vue
      app.mount(vueContainer);
    },
    unmount() {
      app?.unmount();
      app = null;
    }
  };
}
```

**Poin penting:**
- `RouterPlugin` + `useProvideRouter(router)` dari `@esmx/router-vue` (official package)
- Router instance dari hub di-provide ke seluruh Vue component tree
- `useRoute()` reactive — komponen otomatis update saat path berubah
- `mount()` **tidak** memanggil `el.innerHTML = ''` — MicroApp yang mengurus lifecycle container

#### Vue 2 Micro-App (`ssr-vue2/src/index.ts`)

```typescript
import Vue, { defineComponent, h, RouterPlugin, useProvideRouter, useRoute } from 'ssr-npm-vue2';
import type { Router as RouterType } from '@esmx/router';

const routes: Record<string, any> = {
  '/vue2': HomePage,
  '/vue2/about': AboutPage
};

const AppView = defineComponent({
  name: 'AppView',
  setup() {
    const route = useRoute();                     // dari @esmx/router-vue
    return () => {
      const path = route?.path || '/vue2';
      const Component = routes[path] || HomePage;
      return h(Component);
    };
  }
});

function createRootComponent(router: RouterType) {
  return defineComponent({
    name: 'Root',
    setup() {
      useProvideRouter(router);                   // inject router ke Vue app tree
      return () => h(App);
    }
  });
}

export function createApp(router: RouterType) {
  let vm = null;
  return {
    mount(el: HTMLElement) {
      const vueContainer = document.createElement('div');
      el.appendChild(vueContainer);

      Vue.use(RouterPlugin);                      // dari @esmx/router-vue

      vm = new Vue({
        router,
        render: (h) => h(createRootComponent(router))
      });
      vm.$mount(vueContainer);
    },
    unmount() {
      vm?.$destroy();
      vm = null;
    }
  };
}
```

**Poin penting:**
- `RouterPlugin` + `useProvideRouter(router)` dari `@esmx/router-vue` (official package, via `ssr-npm-vue2`)
- Vue 2.7 supports Composition API via `defineComponent` + `setup()`
- `useRoute()` reactive — komponen otomatis update saat path berubah
- `mount()` **tidak** memanggil `el.innerHTML = ''` — MicroApp yang mengurus lifecycle container

---

### 3. Shared Packages — Dependency Sharing

Semua micro-app **tidak bundle framework sendiri**. Mereka import dari shared packages yang di-resolve lewat importmap.

#### `ssr-npm-base` — Router Foundation

```
Exports: @esmx/router, @esmx/class-state
```

Semua micro-app dan shared packages bergantung pada router dari sini.

#### `ssr-npm-react` — React + Router Bindings

```typescript
// Re-export React ecosystem
export { React, ReactDOM, Router, RouterMode };

// Re-export official @esmx/router-react bindings
export {
  RouterContext, RouterViewDepthContext,
  useRoute, useRouter, useRouterViewDepth,
  RouterLink, RouterProvider, RouterView, useLink
} from '@esmx/router-react';
```

React micro-apps (`ssr-react`, `ssr-react-blog`) import semua dari `'ssr-npm-react'` — satu import, dapat React + Router.

#### `ssr-npm-vue3` — Vue 3 + Router Bindings

```typescript
// Re-export seluruh Vue 3
export * from 'vue';

// Re-export official @esmx/router-vue bindings
export {
  RouterPlugin, RouterLink, RouterView,
  useProvideRouter, useRoute, useRouter, useLink,
  getRoute, getRouter, getRouterViewDepth, useRouterViewDepth
} from '@esmx/router-vue';
```

Vue 3 micro-apps (`ssr-vue3`, `ssr-vue3-ecommerce`, `ssr-vue3-admin`) import semua dari `'ssr-npm-vue3'`.

#### `ssr-npm-vue2` — Vue 2 + Router Bindings

```typescript
// Re-export seluruh Vue 2
export * from 'vue';
export default Vue;

// Re-export official @esmx/router-vue bindings
export {
  RouterPlugin, RouterLink, RouterView,
  useProvideRouter, useRoute, useRouter, useLink,
  getRoute, getRouter, getRouterViewDepth, useRouterViewDepth
} from '@esmx/router-vue';
```

Vue 2 micro-app (`ssr-vue2`) imports dari `'ssr-npm-vue2'` — same pattern as Vue 3.

---

### 4. Module Resolution Chain (Runtime)

Contoh: React micro-app mau pakai `RouterLink`

```
1. ssr-react bundle import 'ssr-npm-react'
     ↓ importmap resolves to
2. /my-super-app/ssr-npm-react/dist/client/src/index.mjs
     ↓ re-exports from '@esmx/router-react'
     ↓ scoped importmap resolves to
3. /my-super-app/ssr-npm-react/dist/client/@esmx/router-react.mjs
     ↓ stable wrapper, re-exports from
4. /my-super-app/ssr-npm-react/dist/client/@esmx/router-react.{hash}.final.mjs
     ↓ actual bundled code (lokal, BUKAN CDN)
```

**Semua file di-serve dari `my-super-app/*/dist/`** — tidak ada external CDN.

---

### 5. Build Pipeline

```bash
pnpm build
```

Ini menjalankan 2 tahap:

#### Tahap 1: `pnpm -r --parallel run build`

Build semua 11 workspace packages secara paralel menggunakan ESMX + Rspack:
- Menghasilkan file dengan content hash: `entry.client.{hash}.final.mjs`
- Output ke `my-super-app/*/dist/client/` (browser) dan `dist/server/` (SSR)

#### Tahap 2: `node scripts/post-build.mjs`

Post-build script membuat stable entry points:

1. **`index.mjs`** — Re-export dari file yang di-hash
   ```javascript
   // dist/client/src/index.mjs
   export * from './entry.client.4ec0637c.final.mjs';
   export { default } from './entry.client.4ec0637c.final.mjs';
   ```

2. **React ESM wrappers** — Karena React di-bundle sebagai CJS IIFE, perlu wrapper ESM:
   ```javascript
   // dist/client/react.mjs → wrapper untuk react.{hash}.final.mjs
   // dist/client/react-dom.mjs → wrapper untuk react-dom.{hash}.final.mjs
   ```

3. **Vue stable entries** — `vue.mjs` yang mengarah ke `vue.{hash}.final.mjs`

4. **Router package wrappers** — Stable path untuk `@esmx/router-react.mjs` dan `@esmx/router-vue.mjs`

**Kenapa perlu stable entry?** Karena importmap butuh path yang tetap. File yang di-hash berubah tiap build, tapi importmap mengarah ke `index.mjs` / `react.mjs` yang stabil.

---

### 6. Server (`server.mjs`)

Simple Node.js HTTP server (tanpa Express):

```javascript
// SPA routing: semua app routes serve index.html
const appRoutes = ['/react', '/vue2', '/vue3', '/ecommerce', '/admin', '/blog'];

if (isAppRoute(url)) {
  res.end(readFileSync('public/index.html'));  // SPA fallback
}

// Static files dari build output
if (url.startsWith('/my-super-app/')) {
  res.end(readFileSync(filePath));             // Serve bundled files
}
```

**SPA pattern:** Semua route (`/`, `/react`, `/vue3/about`, dll) mengembalikan `index.html` yang sama. Client-side router yang menentukan micro-app mana yang di-mount.

---

### 7. Navigasi

#### Navigasi dari Hub (Header)

Hub menggunakan `data-nav` attribute + event delegation:

```javascript
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-nav]');
  if (!link) return;
  e.preventDefault();
  router.push(link.getAttribute('data-nav'));
});
```

#### Navigasi dari dalam Micro-App

Micro-app menggunakan custom `<a>` tag yang memanggil `router.push()` secara langsung:

**React:**
```typescript
function NavLink({ to, children }) {
  const router = useRouter();
  return React.createElement('a', {
    href: to,
    onClick: (e) => { e.preventDefault(); router.push(to); }
  }, children);
}
```

**Vue 3:**
```typescript
setup() {
  const router = useRouter();
  const navLink = (to, label) => h('a', {
    href: to,
    onClick: (e) => { e.preventDefault(); router.push(to); }
  }, label);
  return { navLink };
}
```

**Vue 2:**
```typescript
h('a', {
  attrs: { href: to },
  on: { click: (e) => { e.preventDefault(); this.$router.push(to); } }
}, label)
```

> **Catatan:** `@esmx/router-react` dan `@esmx/router-vue` menyediakan komponen `RouterLink` / `<router-link>`, namun pada versi `3.0.0-rc.107` terdapat bug dimana `navigate()` mengecek `e.defaultPrevented` setelah `e.preventDefault()` sudah dipanggil — sehingga navigasi tidak terjadi. Workaround ini bypass bug tersebut dengan memanggil `router.push()` langsung.

Semua navigasi menggunakan **router instance yang sama** (dari hub), sehingga navigasi antar micro-app tetap SPA — tidak ada full page reload.

---

## Dependency Graph

```
                    ┌─────────────┐
                    │ @esmx/router │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼────┐ ┌─────▼─────┐ ┌───▼───────────┐
     │ssr-npm-react│ │ssr-npm-vue2│ │ ssr-npm-vue3  │
     │ + React     │ │ + Vue 2.7  │ │ + Vue 3.5     │
     │ + ReactDOM  │ │ + @esmx/   │ │ + @esmx/      │
     │ + @esmx/    │ │   router-  │ │   router-vue  │
     │  router-    │ │   vue      │ └───┬───────────┘
     │  react      │ └─────┬──────┘     │
     └──┬─────┬────┘       │     ┌──────┼──────────┐
        │     │            │     │      │          │
   ┌────▼┐ ┌──▼──────┐ ┌──▼──┐ ┌▼────┐ ┌▼────────┐┌▼───────┐
   │react│ │react-blog│ │vue2 │ │vue3 │ │ecommerce││ admin  │
   └─────┘ └─────────┘ └─────┘ └─────┘ └─────────┘└────────┘
```

---

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Framework | ESMX v3 (3.0.0-rc.107) |
| Router | @esmx/router v3 |
| Router Bindings | @esmx/router-react, @esmx/router-vue |
| Bundler | Rspack (via @esmx/rspack) |
| Runtime | Node.js 24+ |
| Package Manager | pnpm (workspaces) |
| React | 18.x |
| Vue 2 | 2.7.x |
| Vue 3 | 3.5.x |
| TypeScript | 5.x |

---

## Scripts

```bash
pnpm install      # Install semua dependencies
pnpm build        # Build semua packages + post-build
pnpm dev          # Development mode (parallel)
pnpm clean        # Bersihkan build artifacts
pnpm start        # Start production server di port 3000
```

---

## Prinsip Desain

1. **Single Router** — Satu `@esmx/router` instance di hub mengontrol semua navigasi
2. **Zero CDN** — Semua dependency (React, Vue, router bindings) di-bundle dan di-serve lokal
3. **Framework Agnostic** — React 18, Vue 2.7, dan Vue 3.5 hidup berdampingan dalam satu app
4. **Official Packages** — Menggunakan `@esmx/router-react` dan `@esmx/router-vue` resmi (bukan custom implementation)
5. **Shared Dependencies** — Framework di-deduplikasi lewat shared packages + importmap scoping
6. **Factory Pattern** — Tiap micro-app mengeksport `createApp(router)` → `{ mount, unmount }`
7. **SPA Navigation** — Navigasi antar micro-app tanpa full page reload
