# ESMX Demo - Zero-Delay Micro-Frontend Navigation

Demo project menunjukkan arsitektur **micro-frontend** dengan **zero-delay navigation** menggunakan [ESMX Framework](https://esmx.dev) dan **@esmx/router**.

## ⚡ Zero-Delay Navigation

Semua micro-apps di-**pre-mount** ke hidden containers saat halaman pertama kali dibuka. Navigasi antar apps hanya **toggle visibility** - **TRUE instant, zero delay!**

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser Load (/)                         │
├─────────────────────────────────────────────────────────────┤
│  1. Show Dashboard immediately                               │
│  2. Background: Pre-mount ALL apps to hidden containers      │
│     ├── mount(React)     → hidden div#mount-react            │
│     ├── mount(Vue2)      → hidden div#mount-vue2             │
│     ├── mount(Vue3)      → hidden div#mount-vue3             │
│     ├── mount(Ecommerce) → hidden div#mount-ecommerce        │
│     └── mount(Admin)     → hidden div#mount-admin            │
│  3. Status: "All apps ready - Zero delay navigation!"        │
├─────────────────────────────────────────────────────────────┤
│                     Click /react                             │
├─────────────────────────────────────────────────────────────┤
│  → Hide div#view-dashboard                                   │
│  → Show div#view-react (already rendered!)                   │
│  → INSTANT! No loading, no delay!                            │
└─────────────────────────────────────────────────────────────┘
```

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
├── server.mjs                    # SPA server (serves index.html for all routes)
├── public/
│   └── index.html                # Pre-mount Hub with all apps
└── my-super-app/
    ├── ssr-hub/                  # Hub orchestrator
    ├── ssr-react/                # React 18 micro-app
    ├── ssr-vue2/                 # Vue 2.7 micro-app
    ├── ssr-vue3/                 # Vue 3.5 micro-app
    ├── ssr-vue3-ecommerce/       # E-Commerce micro-app
    ├── ssr-vue3-admin/           # Admin Dashboard micro-app
    ├── ssr-npm-base/             # Shared: @esmx/router
    ├── ssr-npm-react/            # Shared: React + Router React
    ├── ssr-npm-vue2/             # Shared: Vue 2 + Router Vue
    └── ssr-npm-vue3/             # Shared: Vue 3 + Router Vue
```

## Available Routes

| Route | Framework | Description |
|-------|-----------|-------------|
| `/` | - | Dashboard (shows loading status) |
| `/react` | React 18 | React micro-app |
| `/react/about` | React 18 | React nested page |
| `/vue2` | Vue 2.7 | Vue 2 micro-app |
| `/vue3` | Vue 3.5 | Vue 3 micro-app |
| `/ecommerce` | Vue 3.5 | E-Commerce demo |
| `/admin` | Vue 3.5 | Admin dashboard |
| `/admin/settings` | Vue 3.5 | Admin nested page |

## Architecture: Pre-Mount Pattern

### Traditional SPA vs Pre-Mount

| Aspect | Traditional SPA | Pre-Mount (This Demo) |
|--------|-----------------|----------------------|
| Initial Load | Fast | Slightly longer (mounting all apps) |
| First Navigation | **Delay** (import + mount) | **Instant** (toggle visibility) |
| Subsequent Nav | Fast (cached module) | **Instant** (toggle visibility) |
| Memory | Low | Higher (all apps in DOM) |
| User Experience | Loading spinners | **Zero perceived delay** |

### How It Works

```javascript
// 1. Pre-mount all apps on page load
async function premountAllApps() {
  for (const [path, config] of Object.entries(microApps)) {
    const module = await import(config.modulePath);
    const mountFn = module.mount || module.default;
    
    // Mount to hidden container
    const container = document.getElementById(config.mountId);
    mountFn(container, { router: hubRouter });
  }
}

// 2. Navigation = just toggle visibility!
function switchView(appName) {
  document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${appName}`).classList.add('active');
}
```

### DOM Structure

```html
<!-- All views exist in DOM, only one visible at a time -->
<div id="view-dashboard" class="app-view active">...</div>
<div id="view-react" class="app-view">
  <div id="mount-react"><!-- React app mounted here --></div>
</div>
<div id="view-vue2" class="app-view">
  <div id="mount-vue2"><!-- Vue 2 app mounted here --></div>
</div>
<!-- ... more apps ... -->
```

## @esmx/router Integration

### Hub Router
```javascript
const router = new Router({
  mode: RouterMode.history,
  routes: [
    { path: '/', component: null },
    { path: '/react', component: null },
    { path: '/react/:rest(.*)', component: null },
    // ... catch-all for sub-routes
  ]
});

router.afterEach((to) => {
  const appName = getAppNameFromPath(to.path);
  switchView(appName);  // Instant!
});
```

### Shared Router for Cross-App Navigation
```javascript
// Each app receives the hub router
mountFn(container, { router: hubRouter });

// Apps can navigate using shared router
<RouterLink to="/vue3">Go to Vue 3</RouterLink>
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

## Loading Status Indicators

Dashboard menampilkan status loading real-time:

- ⏳ **Loading** - App sedang di-mount di background
- ✅ **Ready** - App sudah ter-mount, siap untuk navigasi instant
- ❌ **Error** - App gagal di-mount

Ketika semua apps ready, badge berubah menjadi:
> ✅ All apps ready - Zero delay navigation!

## Comparison with iframe Approach

| Aspect | iframe | Pre-Mount (ESMX) |
|--------|--------|------------------|
| Memory | High (separate contexts) | Lower (shared runtime) |
| Communication | postMessage | Direct (shared router) |
| Styling | Isolated | Can be shared |
| Dependencies | Duplicated | Shared via import maps |
| Bundle Size | Larger | Smaller (deduped) |

---

**Version**: 6.0 - Zero-Delay Pre-Mount Edition  
**Last Updated**: February 9, 2026  
**Focus**: Zero-delay navigation with @esmx/router
