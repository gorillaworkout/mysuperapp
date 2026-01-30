# 🚀 STEP-BY-STEP: Menambahkan Project Baru ke ESMX Super App

## 📋 Overview

Panduan ini akan mengajarkan cara menambahkan **micro-app baru** (Vue atau React) ke dalam ESMX Super App yang sudah berjalan.

**Time Estimate**: 15-30 menit  
**Difficulty**: Intermediate  
**Prerequisites**: Sudah familiar dengan ESMX structure

---

## 🎯 Scenario

Kamu ingin menambahkan:
- ✅ **Vue 3 App baru** untuk fitur "E-Commerce"
- ✅ **React App baru** untuk fitur "Admin Dashboard"

**Hasil akhir**: `https://your-app.up.railway.app/ecommerce` atau `/admin`

---

## 📁 STEP 1: Buat Folder Structure

### 1.1 Create New Micro-App Folder

```bash
# Masuk ke directory my-super-app
cd /Users/bayudarmawan/Documents/belajar/esmx-demo/my-super-app

# Buat folder baru (contoh: ssr-ecommerce untuk Vue 3)
mkdir ssr-ecommerce

# Atau untuk React (contoh: ssr-admin)
mkdir ssr-admin
```

### 1.2 Create Basic Structure

**Untuk Vue 3:**
```bash
mkdir -p ssr-ecommerce/src/pages
mkdir -p ssr-ecommerce/rspack
```

**Untuk React:**
```bash
mkdir -p ssr-admin/src/pages
mkdir -p ssr-admin/rspack
```

---

## 📦 STEP 2: Create package.json

### 2.1 Vue 3 Micro-App

**File**: `my-super-app/ssr-ecommerce/package.json`

```json
{
  "name": "ssr-ecommerce",
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
    "typescript": "^5.0.0"
  }
}
```

### 2.2 React Micro-App

**File**: `my-super-app/ssr-admin/package.json`

```json
{
  "name": "ssr-admin",
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
    "ssr-npm-react": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@esmx/rspack": "^3.0.0-rc.107",
    "@esmx/core": "^3.0.0-rc.107",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

---

## ⚙️ STEP 3: Create Rspack Config

### 3.1 Vue 3 Config

**File**: `my-super-app/ssr-ecommerce/rspack/config.ts`

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
  }
});
```

### 3.2 React Config

**File**: `my-super-app/ssr-admin/rspack/config.ts`

```typescript
import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.tsx',
    'pages/HomePage': './src/pages/HomePage.tsx'
  },
  output: {
    path: './dist',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  }
});
```

---

## 🎨 STEP 4: Create Entry Files

### 4.1 Vue 3 Entry

**File**: `my-super-app/ssr-ecommerce/src/index.ts`

```typescript
import { createApp } from 'vue';
import { HomePage } from './pages/HomePage.js';

export function mount(container: HTMLElement) {
  const app = createApp(HomePage);
  app.mount(container);
  return app;
}

export function unmount(app: any) {
  app.unmount();
}

export { HomePage };
```

### 4.2 React Entry

**File**: `my-super-app/ssr-admin/src/index.tsx`

```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.js';

export function mount(container: HTMLElement) {
  const root = createRoot(container);
  root.render(React.createElement(HomePage));
  return root;
}

export function unmount(root: any) {
  root.unmount();
}

export { HomePage };
```

---

## 📝 STEP 5: Create entry.node.ts

### 5.1 Vue 3 Entry Node

**File**: `my-super-app/ssr-ecommerce/src/entry.node.ts`

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

### 5.2 React Entry Node

**File**: `my-super-app/ssr-admin/src/entry.node.ts`

```typescript
import type { EsmxOptions } from '@esmx/core';

export default {
  modules: {
    links: {
      'ssr-npm-base': './node_modules/ssr-npm-base/dist',
      'ssr-npm-react': './node_modules/ssr-npm-react/dist'
    },
    imports: {
      'react': 'ssr-npm-react',
      'react-dom': 'ssr-npm-react',
      '@esmx/router': 'ssr-npm-react',
      '@esmx/router-react': 'ssr-npm-react'
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

---

## 🎨 STEP 6: Create Landing Page

### 6.1 Vue 3 Landing Page

**File**: `my-super-app/ssr-ecommerce/src/pages/HomePage.ts`

```typescript
import { defineComponent } from 'vue';

export const HomePage = defineComponent({
  name: 'EcommerceHomePage',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <!-- Navigation -->
      <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🛒</span>
              <span class="font-bold text-xl text-gray-900">E-Commerce</span>
            </div>
            <div class="flex gap-4">
              <a href="/" class="text-gray-600 hover:text-gray-900 font-medium">← Dashboard</a>
              <a href="/vue2" class="text-gray-600 hover:text-emerald-600 font-medium">Vue 2</a>
              <a href="/vue3" class="text-gray-600 hover:text-purple-600 font-medium">Vue 3</a>
              <a href="/react" class="text-gray-600 hover:text-blue-600 font-medium">React</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div class="text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-8">
              <span class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Vue 3 E-Commerce Module
            </div>
            
            <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Build with <span class="text-orange-600">Vue 3</span>
            </h1>
            
            <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Modern e-commerce solution built with Vue 3 Composition API and ESMX micro-frontend architecture.
            </p>
            
            <div class="flex flex-wrap justify-center gap-4">
              <button class="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1">
                Shop Now
              </button>
              <button class="px-8 py-4 bg-white text-orange-600 border-2 border-orange-200 rounded-xl font-semibold hover:border-orange-400 hover:bg-orange-50 transition-all">
                View Catalog
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">E-Commerce Features</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with modern Vue 3 and micro-frontend architecture
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">🛍️</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Product Catalog</h3>
            <p class="text-gray-600 leading-relaxed">
              Browse and search products with advanced filtering and sorting capabilities.
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">🛒</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Shopping Cart</h3>
            <p class="text-gray-600 leading-relaxed">
              Add to cart, manage quantities, and checkout with seamless user experience.
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">💳</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Secure Payment</h3>
            <p class="text-gray-600 leading-relaxed">
              Multiple payment options with secure transaction processing.
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-gray-400">
            🛒 E-Commerce Module • Built with Vue 3 + ESMX
          </p>
        </div>
      </footer>
    </div>
  `
});

export default HomePage;
```

### 6.2 React Landing Page

**File**: `my-super-app/ssr-admin/src/pages/HomePage.tsx`

```typescript
import React from 'react';

export const HomePage = () => {
  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50' },
    // Navigation
    React.createElement('nav', { className: 'bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'flex justify-between items-center h-16' },
          React.createElement('div', { className: 'flex items-center gap-2' },
            React.createElement('span', { className: 'text-2xl' }, '⚙️'),
            React.createElement('span', { className: 'font-bold text-xl text-gray-900' }, 'Admin Dashboard')
          ),
          React.createElement('div', { className: 'flex gap-4' },
            React.createElement('a', { href: '/', className: 'text-gray-600 hover:text-gray-900 font-medium' }, '← Dashboard'),
            React.createElement('a', { href: '/vue2', className: 'text-gray-600 hover:text-emerald-600 font-medium' }, 'Vue 2'),
            React.createElement('a', { href: '/vue3', className: 'text-gray-600 hover:text-purple-600 font-medium' }, 'Vue 3'),
            React.createElement('a', { href: '/react', className: 'text-gray-600 hover:text-blue-600 font-medium' }, 'React')
          )
        )
      )
    ),

    // Hero Section
    React.createElement('div', { className: 'relative overflow-hidden' },
      React.createElement('div', { className: 'absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-600 opacity-10' }),
      React.createElement('div', { className: 'relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28' },
        React.createElement('div', { className: 'text-center' },
          React.createElement('div', { className: 'inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-8' },
            React.createElement('span', { className: 'w-2 h-2 bg-slate-500 rounded-full animate-pulse' }),
            'React 18 Admin Module'
          ),
          
          React.createElement('h1', { className: 'text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight' },
            'Admin ',
            React.createElement('span', { className: 'text-slate-600' }, 'Dashboard')
          ),
          
          React.createElement('p', { className: 'text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed' },
            'Powerful admin panel built with React 18, TypeScript, and ESMX micro-frontend architecture.'
          ),
          
          React.createElement('div', { className: 'flex flex-wrap justify-center gap-4' },
            React.createElement('button', { className: 'px-8 py-4 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all shadow-lg hover:shadow-slate-500/30 transform hover:-translate-y-1' },
              'Get Started'
            ),
            React.createElement('button', { className: 'px-8 py-4 bg-white text-slate-600 border-2 border-slate-200 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all' },
              'Documentation'
            )
          )
        )
      )
    ),

    // Features Section
    React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20' },
      React.createElement('div', { className: 'text-center mb-16' },
        React.createElement('h2', { className: 'text-4xl font-bold text-gray-900 mb-4' }, 'Admin Features'),
        React.createElement('p', { className: 'text-lg text-gray-600 max-w-2xl mx-auto' },
          'Comprehensive tools for managing your application'
        )
      ),
      
      React.createElement('div', { className: 'grid md:grid-cols-3 gap-8' },
        React.createElement('div', { className: 'group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-slate-200' },
          React.createElement('div', { className: 'w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center mb-6' },
            React.createElement('span', { className: 'text-4xl' }, '📊')
          ),
          React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'Analytics'),
          React.createElement('p', { className: 'text-gray-600 leading-relaxed' },
            'Real-time dashboards and reporting tools for data-driven decisions.'
          )
        ),

        React.createElement('div', { className: 'group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-slate-200' },
          React.createElement('div', { className: 'w-16 h-16 bg-gradient-to-br from-gray-100 to-zinc-100 rounded-2xl flex items-center justify-center mb-6' },
            React.createElement('span', { className: 'text-4xl' }, '👥')
          ),
          React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'User Management'),
          React.createElement('p', { className: 'text-gray-600 leading-relaxed' },
            'Manage users, roles, and permissions with granular access control.'
          )
        ),

        React.createElement('div', { className: 'group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-slate-200' },
          React.createElement('div', { className: 'w-16 h-16 bg-gradient-to-br from-zinc-100 to-slate-100 rounded-2xl flex items-center justify-center mb-6' },
            React.createElement('span', { className: 'text-4xl' }, '⚙️')
          ),
          React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'Settings'),
          React.createElement('p', { className: 'text-gray-600 leading-relaxed' },
            'Configure application settings and system preferences.'
          )
        )
      )
    ),

    // Footer
    React.createElement('footer', { className: 'bg-gray-900 text-white py-12' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center' },
        React.createElement('p', { className: 'text-gray-400' },
          '⚙️ Admin Dashboard • Built with React 18 + ESMX'
        )
      )
    )
  );
};

export default HomePage;
```

---

## 🔧 STEP 7: Update Root package.json

**File**: `package.json` (root)

Tambahkan workspace baru:

```json
{
  "name": "esmx-super-app",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm -r --parallel run build",
    "dev": "pnpm -r --parallel run dev",
    "clean": "pnpm -r --parallel run clean",
    "start": "node server.mjs"
  },
  "workspaces": [
    "my-super-app/*"
  ],
  "engines": {
    "node": ">=24.0.0"
  }
}
```

**Note**: Pastikan `workspaces` field include pattern `my-super-app/*`

---

## 🖥️ STEP 8: Update Server Routing

**File**: `server.mjs` (root)

Tambahkan route baru:

```javascript
// Di bagian routing logic
let filePath;
let ext;

if (url === '/vue2' || url === '/vue2/') {
  filePath = join(__dirname, 'public/vue2.html');
  ext = '.html';
} else if (url === '/vue3' || url === '/vue3/') {
  filePath = join(__dirname, 'public/vue3.html');
  ext = '.html';
} else if (url === '/react' || url === '/react/') {
  filePath = join(__dirname, 'public/react.html');
  ext = '.html';
} 
// ⬇️ TAMBAHKAN INI ⬇️
else if (url === '/ecommerce' || url === '/ecommerce/') {
  filePath = join(__dirname, 'public/ecommerce.html');
  ext = '.html';
} else if (url === '/admin' || url === '/admin/') {
  filePath = join(__dirname, 'public/admin.html');
  ext = '.html';
}
// ⬆️ END TAMBAHAN ⬆️
else if (url.startsWith('/my-super-app/')) {
  filePath = join(__dirname, url.replace('/my-super-app/', 'my-super-app/'));
  ext = url.match(/\.[^.]+$/)?.[0] || '';
} else {
  filePath = join(__dirname, 'public', url);
  ext = url.match(/\.[^.]+$/)?.[0] || '';
}
```

---

## 📄 STEP 9: Copy Build Output to Public

Setelah build, copy file ke public:

```bash
# Build dulu
pnpm build

# Copy Vue 3 E-Commerce landing page
cp my-super-app/ssr-ecommerce/dist/VUE2-LANDING.html public/ecommerce.html

# Copy React Admin landing page  
cp my-super-app/ssr-admin/dist/VUE3-LANDING.html public/admin.html
```

**Atau**: Buat script otomatis di `package.json`:

```json
{
  "scripts": {
    "build": "pnpm -r --parallel run build && pnpm copy-public",
    "copy-public": "cp my-super-app/ssr-vue2/dist/VUE2-LANDING.html public/vue2.html && cp my-super-app/ssr-vue3/dist/VUE3-LANDING.html public/vue3.html && cp my-super-app/ssr-hub/dist/TEST-VIEWER-FIXED.html public/react.html && cp my-super-app/ssr-ecommerce/dist/*.html public/ecommerce.html 2>/dev/null || true && cp my-super-app/ssr-admin/dist/*.html public/admin.html 2>/dev/null || true"
  }
}
```

---

## 🧪 STEP 10: Test Locally

### 10.1 Install Dependencies

```bash
# Install untuk workspace baru
pnpm install

# Atau spesifik
pnpm install --filter ssr-ecommerce
pnpm install --filter ssr-admin
```

### 10.2 Build

```bash
# Build semua
pnpm build

# Atau spesifik
pnpm --filter ssr-ecommerce build
pnpm --filter ssr-admin build
```

### 10.3 Test Server

```bash
# Start local server
node server.mjs

# Buka browser:
# http://localhost:3000/ecommerce  (Vue 3)
# http://localhost:3000/admin      (React)
```

---

## 🚀 STEP 11: Deploy ke Production

### 11.1 Commit & Push

```bash
# Add semua file baru
git add my-super-app/ssr-ecommerce my-super-app/ssr-admin public/ecommerce.html public/admin.html server.mjs package.json

# Commit
git commit -m "Add new micro-apps: E-Commerce (Vue 3) and Admin (React)"

# Push
git push origin main
```

### 11.2 Deploy ke Railway

```bash
# Deploy
railway up --service esmx-demo

# Atau tunggu auto-deploy dari Git push
```

### 11.3 Verify Deployment

```bash
# Test URL
curl https://esmx-demo-production.up.railway.app/ecommerce
curl https://esmx-demo-production.up.railway.app/admin
```

---

## ✅ CHECKLIST

### Pre-Development:
- [ ] Folder structure created
- [ ] package.json configured
- [ ] rspack config created

### Development:
- [ ] Entry files (index.ts/tsx) created
- [ ] entry.node.ts configured
- [ ] Landing page built
- [ ] Routing updated in server.mjs

### Testing:
- [ ] Local build successful
- [ ] Local server test passed
- [ ] All routes accessible

### Deployment:
- [ ] Files copied to public/
- [ ] Committed to Git
- [ ] Pushed to GitHub
- [ ] Railway deploy successful
- [ ] Production URL tested

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module"
**Solusi**: Run `pnpm install` lagi

### Error: "Module parse failed"
**Solusi**: Cek rspack config, pastikan extensions benar

### Error: "Port already in use"
**Solusi**: `pkill -9 node` lalu restart

### Error: "404 Not Found"
**Solusi**: Cek server.mjs routing, pastikan file ada di public/

### Error: "Content-Type wrong"
**Solusi**: Pastikan ext = '.html' di server routing

---

## 📚 CONTOH LENGKAP

### Contoh: Menambahkan "Blog" (Vue 3)

**Total waktu**: ~20 menit

**Steps**:
1. `mkdir my-super-app/ssr-blog`
2. Copy template dari `ssr-vue3`
3. Edit `package.json` → name: "ssr-blog"
4. Edit `HomePage.ts` → ganti konten blog
5. `pnpm install`
6. `pnpm build`
7. `cp dist/*.html public/blog.html`
8. Edit `server.mjs` → tambah route `/blog`
9. `git add . && git commit -m "Add blog module" && git push`
10. `railway up --service esmx-demo`

**Done!** 🎉

---

## 🎯 NEXT STEPS

Setelah berhasil menambahkan project:
1. **Add Authentication** - Protect routes
2. **Add API Integration** - Connect ke backend
3. **Add State Management** - Shared state
4. **Add More Pages** - Multiple routes per micro-app
5. **Add Tests** - Unit & integration tests

---

**Selamat! Kamu sekarang bisa menambahkan micro-app baru kapan saja!** 🚀
