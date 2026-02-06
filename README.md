# ESMX Demo - Multi-Framework Micro-Frontend

Demo project menunjukkan arsitektur **micro-frontend** menggunakan [ESMX Framework](https://esmx.dev) dengan multiple frameworks (React 18, Vue 2, Vue 3) dalam satu aplikasi.

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start server
node server.mjs
```

Buka: http://localhost:3000

## Project Structure

```
esmx-demo/
├── server.mjs                    # Main server
├── public/
│   └── index.html                # Landing page
└── my-super-app/
    ├── ssr-react/                # React 18 micro-app (SSR)
    ├── ssr-vue2/                 # Vue 2.7 micro-app
    ├── ssr-vue3/                 # Vue 3.5 micro-app
    ├── ssr-vue3-ecommerce/       # E-Commerce micro-app
    ├── ssr-vue3-admin/           # Admin Dashboard micro-app
    ├── ssr-npm-base/             # Shared: @esmx/router
    ├── ssr-npm-react/            # Shared: React + React-DOM
    ├── ssr-npm-vue2/             # Shared: Vue 2
    └── ssr-npm-vue3/             # Shared: Vue 3
```

## Available Routes

| Route | Framework | SSR | Description |
|-------|-----------|-----|-------------|
| `/` | - | - | Landing page dashboard |
| `/react` | React 18 | Yes | React micro-app with SSR |
| `/vue2` | Vue 2.7 | No | Vue 2 micro-app |
| `/vue3` | Vue 3.5 | No | Vue 3 micro-app |
| `/ecommerce` | Vue 3.5 | No | E-Commerce demo |
| `/admin` | Vue 3.5 | No | Admin dashboard demo |

## Architecture

### DIAMOND Pattern

```
                    ssr-hub (Entry Point)
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

**Key Concepts:**
- **Hub & Spokes**: Server sebagai hub, micro-apps sebagai spokes
- **Shared Dependencies**: Framework dependencies di-share via `ssr-npm-*` packages
- **SSR Support**: React app sudah SSR, Vue apps masih CSR

### How SSR Works (React)

```
Browser Request → Server loads entry.server.ts → renderToString()
       ↓
Server returns full HTML → Browser shows content immediately
       ↓
Browser loads hydrate.mjs → hydrateRoot() → App becomes interactive
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | ESMX v3 |
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
pnpm start    # Start production server (server.mjs)
```

## Import Maps

Server menggunakan import maps untuk resolve dependencies dari esm.sh:

```html
<script type="importmap">{
  "imports": {
    "react": "https://esm.sh/react@18.3.1",
    "react-dom": "https://esm.sh/react-dom@18.3.1",
    "vue": "https://esm.sh/vue@3.5.13",
    "@esmx/router": "/my-super-app/ssr-npm-base/dist/client/@esmx/router/index.mjs"
  }
}</script>
```

## Notes

- **React app** menggunakan SSR dengan hydration
- **Vue apps** masih client-side rendering (SSR belum diimplementasi)
- **React** belum menggunakan `ssr-npm-base` karena `react-router` belum ada di dalamnya

---

**Version**: 4.0  
**Last Updated**: February 6, 2026
