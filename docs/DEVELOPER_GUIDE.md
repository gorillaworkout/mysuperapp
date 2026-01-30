# ESMX Super App - Developer Guide

## 📚 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Adding a New Project](#adding-a-new-project)
4. [Local Development](#local-development)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

ESMX Super App menggunakan **micro-frontend architecture** dengan pattern:

- **Hub & Spokes**: `ssr-hub` sebagai entry point utama
- **NPM Packages**: Shared packages (`ssr-npm-base`, `ssr-npm-react`, `ssr-npm-vue2`, `ssr-npm-vue3`)
- **SSR Apps**: Individual apps (`ssr-react`, `ssr-vue2`, `ssr-vue3`)

### Current Projects (4 Active)

| Project | Framework | Type | URL Path |
|---------|-----------|------|----------|
| ssr-react | React 18 | SSR App | `/react` |
| ssr-vue2 | Vue 2.7 | SSR App | `/vue2` |
| ssr-vue3 | Vue 3.3 | SSR App | `/vue3` |
| ssr-vue3-ecommerce | Vue 3.3 | SSR App | `/ecommerce` |

---

## Project Structure

```
esmx-demo/
├── my-super-app/
│   ├── ssr-hub/              # Entry point & dashboard
│   ├── ssr-react/            # React SSR app
│   ├── ssr-vue2/             # Vue 2.7 SSR app
│   ├── ssr-vue3/             # Vue 3.3 SSR app
│   ├── ssr-vue3-ecommerce/   # Vue 3 E-Commerce app
│   ├── ssr-npm-base/         # Shared base packages
│   ├── ssr-npm-react/        # React shared deps
│   ├── ssr-npm-vue2/         # Vue 2 shared deps
│   └── ssr-npm-vue3/         # Vue 3 shared deps
├── public/                   # Static HTML files
│   ├── index.html           # Dashboard with cards
│   ├── react.html           # React app HTML
│   ├── vue2.html            # Vue 2 app HTML
│   ├── vue3.html            # Vue 3 app HTML
│   └── ecommerce.html       # E-Commerce app HTML
├── server.mjs               # Node.js server
├── Dockerfile               # Docker config
├── package.json             # Root package
└── pnpm-workspace.yaml      # PNPM workspace config
```

---

## Adding a New Project

### Step 1: Create Project Directory

```bash
mkdir -p my-super-app/ssr-vue3-ecommerce/src/pages
```

### Step 2: Create package.json

Create `my-super-app/ssr-vue3-ecommerce/package.json`:

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

**Important**: Use `ts-loader` instead of `builtin:swc-loader` to avoid parsing binary files in node_modules.

### Step 3: Create Rspack Config

Create `my-super-app/ssr-vue3-ecommerce/rspack/config.ts`:

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
    noParse: /node_modules/,  // Important: Skip parsing node_modules
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

### Step 4: Create Source Files

#### Entry Files

**`src/entry.node.ts`**:
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

**Important**: `entry.node.ts` must export an `EsmxOptions` object with module links and imports, NOT a server instance!

**`src/entry.server.ts`**:
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

**`src/entry.client.ts`**:
```typescript
import { createApp } from 'vue';

const app = createApp({
  template: '<div>E-Commerce App</div>'
});

app.mount('#app');
```

**`src/index.ts`**:
```typescript
export { default as server } from './entry.server';
export { default as client } from './entry.client';
```

#### Page Component

**`src/pages/HomePage.ts`**:
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

### Step 5: Create HTML File

Create `public/ecommerce.html`:

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
  <!-- Static HTML content - no ES module imports -->
  <div class="min-h-screen bg-gradient-to-br from-orange-400 to-red-500">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-5xl font-bold text-white mb-8">🛒 E-Commerce</h1>
      <p class="text-xl text-white/90">Vue 3 E-Commerce Module</p>
    </div>
  </div>
</body>
</html>
```

**Important**: Use static HTML like other pages (vue2.html, vue3.html, react.html). Don't use ES module imports (`import { createApp } from 'vue'`) as they won't resolve correctly!

### Step 6: Update Server

Edit `server.mjs` to add route:

```javascript
// Add this condition in the URL routing section
} else if (url === '/ecommerce' || url === '/ecommerce/') {
  filePath = join(__dirname, 'public/ecommerce.html');
  ext = '.html';
} else if (url.startsWith('/my-super-app/')) {
```

Also update the console.log banner:

```javascript
console.log('║  🌿 Vue 2:     /vue2                           ║');
console.log('║  💜 Vue 3:     /vue3                           ║');
console.log('║  🔥 React:     /react                          ║');
console.log('║  🛒 E-Commerce: /ecommerce                     ║');
```

### Step 7: Update Dashboard

Edit `public/index.html`:

1. Change grid to 4 columns:
```html
<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
```

2. Add the 4th card after Vue 3 card:
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

3. Update stats:
```html
<div class="text-3xl font-bold text-green-600 mb-1">8</div>
<div class="text-green-700 text-sm">Packages Built</div>
```

```html
<div class="text-3xl font-bold text-blue-600 mb-1">4</div>
<div class="text-blue-700 text-sm">Frameworks</div>
```

### Step 8: Install Dependencies

```bash
pnpm install
```

### Step 9: Build Locally

```bash
pnpm clean
pnpm build
```

### Step 10: Test Locally

```bash
node server.mjs
```

Open http://localhost:3000 and verify all 4 cards appear.

---

## Local Development

### Commands

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Clean build artifacts
pnpm clean

# Start development server
pnpm dev

# Start production server
node server.mjs
```

### Testing Individual Projects

```bash
# Build specific project
cd my-super-app/ssr-vue3-ecommerce
pnpm build

# Test specific route
curl http://localhost:3000/ecommerce
```

### File Structure for New Project

```
ssr-vue3-ecommerce/
├── package.json
├── rspack/
│   └── config.ts
└── src/
    ├── entry.client.ts
    ├── entry.node.ts
    ├── entry.server.ts
    ├── index.ts
    └── pages/
        └── HomePage.ts
```

---

## Deployment

### Prerequisites

1. Railway CLI installed: `npm install -g @railway/cli`
2. Logged in: `railway login`
3. Project linked: `railway link`

### Deploy Steps

```bash
# Check status
railway status

# Deploy to specific service
railway up --service perceptive-compassion

# View logs
railway logs

# Get domain
railway domain
```

### Dockerfile Best Practices

Current Dockerfile:

```dockerfile
# Use Node 24 (required by ESMX)
FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first (for caching)
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY my-super-app/ssr-hub/package.json ./my-super-app/ssr-hub/
COPY my-super-app/ssr-react/package.json ./my-super-app/ssr-react/
COPY my-super-app/ssr-vue2/package.json ./my-super-app/ssr-vue2/
COPY my-super-app/ssr-vue3/package.json ./my-super-app/ssr-vue3/
COPY my-super-app/ssr-npm-base/package.json ./my-super-app/ssr-npm-base/
COPY my-super-app/ssr-npm-react/package.json ./my-super-app/ssr-npm-react/
COPY my-super-app/ssr-npm-vue2/package.json ./my-super-app/ssr-npm-vue2/
COPY my-super-app/ssr-npm-vue3/package.json ./my-super-app/ssr-npm-vue3/
# Add new project here:
# COPY my-super-app/ssr-vue3-ecommerce/package.json ./my-super-app/ssr-vue3-ecommerce/

# Install dependencies
RUN pnpm install

# Copy all source files
COPY . .

# Remove problematic C# files (optional safety)
RUN find node_modules -type f -name "*.cs" -delete 2>/dev/null || true

# Build all packages
RUN pnpm build

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.mjs"]
```

**Important**: When adding new project, add its package.json COPY line before `pnpm install`.

---

## Troubleshooting

### Build Fails with "Module parse failed"

**Error**: `JavaScript parse error: Unexpected character '\u{7f}'`

**Cause**: Rspack trying to parse binary files (.so, .node) in node_modules.

**Solution**: 
1. Use `ts-loader` instead of `builtin:swc-loader`
2. Add `noParse: /node_modules/` to rspack config
3. Exclude node_modules in loader rules

### Build Fails with "Cannot find module"

**Error**: `Cannot find module '@rspack/binding-linux-x64-musl'`

**Cause**: Deleted .node files that are required.

**Solution**: Don't delete `.node` files in Dockerfile, only `.cs` files.

### Railway Deployment Fails

**Check logs**:
```bash
railway logs --deployment <deployment-id>
```

**Common fixes**:
1. Ensure all package.json files are copied in Dockerfile
2. Use `ts-loader` for new projects
3. Add `noParse` to rspack config

### Local Works but Railway Fails

This usually happens because:
1. Different Node versions (use node:24-alpine)
2. Missing COPY commands in Dockerfile
3. Binary file parsing issues (use ts-loader)

### Port Already in Use

```bash
# Kill existing server
pkill -f "node server.mjs"

# Or use different port
PORT=3001 node server.mjs
```

---

## Quick Reference

### Adding Project Checklist

- [ ] Create directory structure
- [ ] Create package.json with ts-loader
- [ ] Create rspack/config.ts with noParse
- [ ] Create entry files (client, server, node, index)
- [ ] Create page component
- [ ] Create HTML file in public/
- [ ] Update server.mjs route
- [ ] Update public/index.html card
- [ ] Update Dockerfile COPY command
- [ ] Run pnpm install
- [ ] Run pnpm build
- [ ] Test locally
- [ ] Deploy to Railway

### File Templates

See existing projects in `my-super-app/` for reference:
- `ssr-vue3/` - Best reference for Vue 3 projects
- `ssr-react/` - Best reference for React projects
- `ssr-vue2/` - Best reference for Vue 2 projects

---

## Next Steps

1. **Copy this guide** when creating new projects
2. **Test locally first** before deploying
3. **Use ts-loader** to avoid binary file issues
4. **Always add noParse** to rspack config
5. **Update Dockerfile** with new project package.json

Good luck! 🚀
