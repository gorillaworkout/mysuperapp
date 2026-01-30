# ESMX Super App - Complete Developer Guide

## 📍 Where Am I? (Important!)

**Project Root**: `/Users/bayudarmawan/Documents/belajar/esmx-demo` (folder `esmx-demo`)

**Working Directory Structure**:
```
esmx-demo/                    ← YOU ARE HERE (Root)
├── my-super-app/            ← Sub-projects folder
│   ├── ssr-hub/            ← Individual project
│   ├── ssr-react/          ← Individual project
│   ├── ssr-vue2/           ← Individual project
│   ├── ssr-vue3/           ← Individual project
│   ├── ssr-vue3-ecommerce/ ← Individual project (example)
│   └── ssr-npm-*/          ← Shared packages
├── public/                  ← Static HTML files
├── server.mjs              ← Main server file
├── package.json            ← Root package.json
└── docs/                   ← This documentation
```

**Rule of Thumb**:
- 🔵 **BLUE commands** = Run in **ROOT** (`esmx-demo/`)
- 🟢 **GREEN commands** = Run in **SUB-PROJECT** (`my-super-app/ssr-xxx/`)

---

## 🚀 Quick Start (For First Time)

### Step 1: Open Terminal

Open terminal and navigate to project root:
```bash
cd /Users/bayudarmawan/Documents/belajar/esmx-demo
```

### Step 2: Install Dependencies (Root)

🔵 **Location**: `esmx-demo/`
```bash
pnpm install
```

### Step 3: Build All Projects (Root)

🔵 **Location**: `esmx-demo/`
```bash
pnpm build
```

### Step 4: Start Server (Root)

🔵 **Location**: `esmx-demo/`
```bash
node server.mjs
```

### Step 5: Open Browser

Navigate to: http://localhost:3000

---

## 📚 Complete Command Reference

### Daily Development Commands

| Command | Where to Run | Description |
|---------|--------------|-------------|
| `pnpm install` | 🔵 Root | Install all dependencies |
| `pnpm build` | 🔵 Root | Build ALL 9 packages |
| `pnpm clean` | 🔵 Root | Delete all dist/ folders |
| `node server.mjs` | 🔵 Root | Start production server |
| `pnpm dev` | 🟢 Sub-project | Start single project dev mode |

### Individual Project Commands

🔵 **Build specific project from root**:
```bash
cd /Users/bayudarmawan/Documents/belajar/esmx-demo
pnpm --filter ssr-vue3 build
```

🟢 **Build from inside project**:
```bash
cd my-super-app/ssr-vue3
pnpm build
```

---

## 🏗️ Project Architecture

### Current Active Projects (4)

| Project | Path | URL | Description |
|---------|------|-----|-------------|
| ssr-hub | `my-super-app/ssr-hub/` | `/` | Dashboard & entry point |
| ssr-react | `my-super-app/ssr-react/` | `/react` | React 18 SSR app |
| ssr-vue2 | `my-super-app/ssr-vue2/` | `/vue2` | Vue 2.7 SSR app |
| ssr-vue3 | `my-super-app/ssr-vue3/` | `/vue3` | Vue 3.3 SSR app |
| ssr-vue3-ecommerce | `my-super-app/ssr-vue3-ecommerce/` | `/ecommerce` | Vue 3 E-Commerce |

### Shared Packages (4)

| Package | Path | Purpose |
|---------|------|---------|
| ssr-npm-base | `my-super-app/ssr-npm-base/` | Base utilities & router |
| ssr-npm-react | `my-super-app/ssr-npm-react/` | React shared deps |
| ssr-npm-vue2 | `my-super-app/ssr-npm-vue2/` | Vue 2 shared deps |
| ssr-npm-vue3 | `my-super-app/ssr-npm-vue3/` | Vue 3 shared deps |

---

## ➕ Adding New Project: Complete Walkthrough

### Goal: Add `ssr-vue3-ecommerce` project

---

### Phase 1: Create Project Structure

🔵 **Location**: `esmx-demo/`

```bash
# Create directory structure
mkdir -p my-super-app/ssr-vue3-ecommerce/src/pages
mkdir -p my-super-app/ssr-vue3-ecommerce/rspack
```

**Verify**:
```bash
ls -la my-super-app/ssr-vue3-ecommerce/
# Should show: src/ rspack/
```

---

### Phase 2: Create package.json

🔵 **Location**: `esmx-demo/`

Create file: `my-super-app/ssr-vue3-ecommerce/package.json`

```json
{
  "name": "ssr-vue3-ecommerce",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js",
    "./pages/HomePage": "./dist/pages/HomePage.js"
  },
  "scripts": {
    "build": "esmx build",
    "dev": "esmx dev",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "ssr-npm-base": "workspace:*",
    "ssr-npm-vue3": "workspace:*",
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@esmx/rspack": "^3.0.0-rc.107",
    "@esmx/core": "^3.0.0-rc.107",
    "typescript": "^5.0.0",
    "ts-loader": "^9.4.0"
  }
}
```

**Key Points**:
- Use `ts-loader` (NOT `builtin:swc-loader`)
- Dependencies use `workspace:*` for shared packages

---

### Phase 3: Create Rspack Config

🔵 **Location**: `esmx-demo/`

Create file: `my-super-app/ssr-vue3-ecommerce/rspack/config.ts`

```typescript
import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'pages/HomePage': './src/pages/HomePage.ts'
  },
  output: {
    path: './dist',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    noParse: /node_modules/,  // Critical: Skip parsing node_modules
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
});
```

**Critical Settings**:
- `noParse: /node_modules/` - Prevents parsing binary files
- `exclude: /node_modules/` in loader rules
- Use `ts-loader` not swc-loader

---

### Phase 4: Create Source Files

🔵 **Location**: `esmx-demo/`

#### File 1: src/entry.node.ts

```typescript
import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-base': './node_modules/ssr-npm-base/dist',
      'ssr-npm-vue3': './node_modules/ssr-npm-vue3/dist'
    },
    imports: {
      'vue': 'ssr-npm-vue3',
      '@esmx/router': 'ssr-npm-base',
      '@esmx/router-vue': 'ssr-npm-vue3'
    },
    exports: []
  },
  async devApp(esmx) {
    return import('@esmx/rspack').then((m) =>
      m.createRspackHtmlApp(esmx, { chain() {} })
    );
  }
} satisfies EsmxOptions;
```

**⚠️ WARNING**: Must export `EsmxOptions` object, NOT a server instance!

#### File 2: src/entry.server.ts

```typescript
import { createApp } from 'vue';
import { renderToString } from 'vue/server-renderer';

export default async function server(ctx: any) {
  const app = createApp({
    template: '<div>E-Commerce App</div>'
  });
  
  const html = await renderToString(app);
  return html;
}
```

#### File 3: src/entry.client.ts

```typescript
import { createApp } from 'vue';

const app = createApp({
  template: '<div>E-Commerce App</div>'
});

app.mount('#app');
```

#### File 4: src/index.ts

```typescript
export { default as server } from './entry.server';
export { default as client } from './entry.client';
```

#### File 5: src/pages/HomePage.ts

```typescript
import { h } from 'vue';

export default {
  name: 'HomePage',
  setup() {
    return () => h('div', { class: 'ecommerce-home' }, [
      h('h1', 'E-Commerce Home'),
      h('p', 'Welcome to our store!')
    ]);
  }
};
```

**Verify all files created**:
```bash
ls -la my-super-app/ssr-vue3-ecommerce/src/
# Should show: entry.client.ts entry.node.ts entry.server.ts index.ts
# And folder: pages/

ls -la my-super-app/ssr-vue3-ecommerce/src/pages/
# Should show: HomePage.ts
```

---

### Phase 5: Create HTML File

🔵 **Location**: `esmx-demo/`

Create file: `public/ecommerce.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Commerce - Vue 3</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <!-- Static HTML only - NO ES module imports -->
  <div class="min-h-screen bg-gradient-to-br from-orange-400 to-red-500">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-5xl font-bold text-white mb-8">🛒 E-Commerce</h1>
      <p class="text-xl text-white/90">Vue 3 E-Commerce Module</p>
    </div>
  </div>
</body>
</html>
```

**⚠️ WARNING**: Use static HTML like other pages. Don't use `<script type="module">` with ES imports!

---

### Phase 6: Update Server

🔵 **Location**: `esmx-demo/`

Edit file: `server.mjs`

Find this section (around line 47-65):
```javascript
if (url === '/vue2' || url === '/vue2/') {
  filePath = join(__dirname, 'public/vue2.html');
  ext = '.html';
} else if (url === '/vue3' || url === '/vue3/') {
  filePath = join(__dirname, 'public/vue3.html');
  ext = '.html';
} else if (url === '/react' || url === '/react/') {
  filePath = join(__dirname, 'public/react.html');
  ext = '.html';
} else if (url.startsWith('/my-super-app/')) {
```

Add new route BEFORE the last else if:
```javascript
} else if (url === '/ecommerce' || url === '/ecommerce/') {
  filePath = join(__dirname, 'public/ecommerce.html');
  ext = '.html';
} else if (url.startsWith('/my-super-app/')) {
```

Also update console banner (around line 91-105):
```javascript
console.log('║  🌿 Vue 2:     /vue2                           ║');
console.log('║  💜 Vue 3:     /vue3                           ║');
console.log('║  🔥 React:     /react                          ║');
console.log('║  🛒 E-Commerce: /ecommerce                     ║');
```

---

### Phase 7: Update Dashboard

🔵 **Location**: `esmx-demo/`

Edit file: `public/index.html`

#### Change 1: Update Grid Columns
Find: `<div class="grid md:grid-cols-3 gap-8">`
Change to: `<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">`

#### Change 2: Add 4th Card
After Vue 3 card, add:
```html
<a href="/ecommerce" class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 block cursor-pointer">
  <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
    <span class="text-4xl">🛒</span>
  </div>
  <h3 class="text-2xl font-bold text-gray-900 mb-2">E-Commerce</h3>
  <p class="text-gray-600 mb-4">Vue 3 E-Commerce Module</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">Vue 3.3</span>
    <span class="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">E-Commerce</span>
  </div>
</a>
```

#### Change 3: Update Stats
Find and change:
- Packages: `7` → `8`
- Frameworks: `3` → `4`

---

### Phase 8: Update Dockerfile

🔵 **Location**: `esmx-demo/`

Edit file: `Dockerfile`

Add COPY command for new project (around line 18):
```dockerfile
COPY my-super-app/ssr-vue3-ecommerce/package.json ./my-super-app/ssr-vue3-ecommerce/
```

**Full Dockerfile section**:
```dockerfile
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY my-super-app/ssr-hub/package.json ./my-super-app/ssr-hub/
COPY my-super-app/ssr-react/package.json ./my-super-app/ssr-react/
COPY my-super-app/ssr-vue2/package.json ./my-super-app/ssr-vue2/
COPY my-super-app/ssr-vue3/package.json ./my-super-app/ssr-vue3/
COPY my-super-app/ssr-vue3-ecommerce/package.json ./my-super-app/ssr-vue3-ecommerce/  ← ADD THIS
COPY my-super-app/ssr-npm-base/package.json ./my-super-app/ssr-npm-base/
COPY my-super-app/ssr-npm-react/package.json ./my-super-app/ssr-npm-react/
COPY my-super-app/ssr-npm-vue2/package.json ./my-super-app/ssr-npm-vue2/
COPY my-super-app/ssr-npm-vue3/package.json ./my-super-app/ssr-npm-vue3/
```

---

### Phase 9: Install Dependencies

🔵 **Location**: `esmx-demo/`

```bash
pnpm install
```

This will install dependencies for the new project too.

---

### Phase 10: Build Project

🔵 **Location**: `esmx-demo/`

**Option A: Build all projects**:
```bash
pnpm clean
pnpm build
```

**Option B: Build only new project**:
```bash
cd my-super-app/ssr-vue3-ecommerce
pnpm build
```

Or from root:
```bash
pnpm --filter ssr-vue3-ecommerce build
```

---

### Phase 11: Test Locally

🔵 **Location**: `esmx-demo/`

```bash
node server.mjs
```

Open browser: http://localhost:3000

**Verify**:
- [ ] Dashboard shows 4 cards
- [ ] Click E-Commerce card works
- [ ] All other cards still work

---

### Phase 12: Deploy to Railway

🔵 **Location**: `esmx-demo/`

```bash
# Check status
railway status

# Deploy
railway up --service perceptive-compassion

# Check logs
railway logs

# Get domain
railway domain
```

---

## 🧪 Testing Commands

### Test from Root

🔵 **Location**: `esmx-demo/`

```bash
# Test all routes
curl http://localhost:3000
curl http://localhost:3000/react
curl http://localhost:3000/vue2
curl http://localhost:3000/vue3
curl http://localhost:3000/ecommerce

# Check build output
ls my-super-app/ssr-vue3-ecommerce/dist/
```

### Test Individual Project

🟢 **Location**: `my-super-app/ssr-vue3-ecommerce/`

```bash
cd my-super-app/ssr-vue3-ecommerce

# Build
pnpm build

# Check output
ls dist/
cat dist/manifest.json
```

---

## 🐛 Troubleshooting Guide

### Problem 1: "Module parse failed" Error

**Symptom**: Build fails with `JavaScript parse error: Unexpected character`

**Cause**: Rspack trying to parse binary files in node_modules

**Solution**:
1. Check `rspack/config.ts` has:
   - `noParse: /node_modules/`
   - `use: 'ts-loader'` (not swc-loader)
   - `exclude: /node_modules/` in rules

2. Rebuild:
```bash
pnpm clean
pnpm build
```

### Problem 2: "Cannot find module" Error

**Symptom**: `Cannot find module '@rspack/binding-linux-x64-musl'`

**Cause**: Missing .node files (accidentally deleted)

**Solution**:
- Don't delete `.node` files in Dockerfile
- Only delete `.cs` files if needed

### Problem 3: Port Already in Use

**Symptom**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill all node processes
pkill -f "node server.mjs"

# Or use different port
PORT=3001 node server.mjs
```

### Problem 4: ES Module Import Error in Browser

**Symptom**: `Failed to resolve module specifier "vue"`

**Cause**: Using ES module imports in HTML file

**Solution**: Use static HTML only, no `<script type="module">`

---

## ✅ Complete Checklist

### Before Starting
- [ ] Terminal open in `esmx-demo/` root
- [ ] Node.js 24+ installed
- [ ] PNPM installed

### Creating Project
- [ ] Directory structure created
- [ ] package.json created with ts-loader
- [ ] rspack/config.ts with noParse
- [ ] All 5 source files created in correct locations
- [ ] HTML file created in public/

### Integration
- [ ] server.mjs updated with new route
- [ ] public/index.html updated with new card
- [ ] Dockerfile updated with COPY command

### Testing
- [ ] pnpm install success
- [ ] pnpm build success
- [ ] node server.mjs starts without error
- [ ] All 4 cards visible on dashboard
- [ ] All routes return 200 OK

### Deployment
- [ ] railway up success
- [ ] railway domain shows URL
- [ ] Live site works correctly

---

## 📖 Reference: File Locations

### Root Level Files (esmx-demo/)
- `package.json` - Root package config
- `pnpm-workspace.yaml` - Workspace definition
- `server.mjs` - Main server
- `Dockerfile` - Docker config
- `.npmrc` - NPM config

### Public Files (esmx-demo/public/)
- `index.html` - Dashboard
- `react.html` - React app page
- `vue2.html` - Vue 2 app page
- `vue3.html` - Vue 3 app page
- `ecommerce.html` - E-Commerce page

### Project Files (esmx-demo/my-super-app/PROJECT_NAME/)
- `package.json` - Project config
- `rspack/config.ts` - Build config
- `src/entry.node.ts` - Node entry
- `src/entry.server.ts` - Server entry
- `src/entry.client.ts` - Client entry
- `src/index.ts` - Main exports
- `src/pages/*.ts` - Page components

---

## 🎯 Next Steps

1. **Follow the walkthrough** step-by-step
2. **Use correct directory** for each command
3. **Test locally** before deploying
4. **Check checklist** before moving to next phase

Good luck! 🚀
