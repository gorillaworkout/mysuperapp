# ESMX Micro-Frontend Routing Structure

## Overview
Setiap micro-app sekarang memiliki **2 halaman** yang menunjukkan struktur routing hierarkis.

## Routing Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  HUB LEVEL (ESMX Router)                                    │
│  - Mengatur switching antar micro-apps                      │
│  - URL pattern: /{app-name}                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│  React   │    │  Vue 2   │    │  Vue 3   │
│  App     │    │  App     │    │  App     │
└────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │
     ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│  APP LEVEL (Internal Routing)                               │
│  - Mengatur navigasi internal dalam satu app                │
│  - URL pattern: /{app-name}/{page}                          │
└─────────────────────────────────────────────────────────────┘
```

## Route Structure

### 1. React App (ssr-react)
| Route | Page | Description |
|-------|------|-------------|
| `/react` | HomePage.tsx | Halaman utama React |
| `/react/about` | AboutPage.tsx | Halaman about React |

**Internal Routing:**
```javascript
// src/index.tsx
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/react/about' || path.startsWith('/react/about/')) {
    return 'about';
  }
  return 'home';
}
```

### 2. Vue 2 App (ssr-vue2)
| Route | Page | Description |
|-------|------|-------------|
| `/vue2` | HomePage.ts | Halaman utama Vue 2 |
| `/vue2/about` | AboutPage.ts | Halaman about Vue 2 |

**Internal Routing:**
```javascript
// src/index.ts
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/vue2/about' || path.startsWith('/vue2/about/')) {
    return 'about';
  }
  return 'home';
}
```

### 3. Vue 3 App (ssr-vue3)
| Route | Page | Description |
|-------|------|-------------|
| `/vue3` | HomePage.ts | Halaman utama Vue 3 |
| `/vue3/about` | AboutPage.ts | Halaman about Vue 3 |

**Internal Routing:**
```javascript
// src/index.ts
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/vue3/about' || path.startsWith('/vue3/about/')) {
    return 'about';
  }
  return 'home';
}
```

### 4. E-Commerce App (ssr-vue3-ecommerce)
| Route | Page | Description |
|-------|------|-------------|
| `/ecommerce` | HomePage.ts | Dashboard e-commerce |
| `/ecommerce/about` | AboutPage.ts | About store |

**Internal Routing:**
```javascript
// src/index.ts
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/ecommerce/about' || path.startsWith('/ecommerce/about/')) {
    return 'about';
  }
  return 'home';
}
```

### 5. Admin App (ssr-vue3-admin)
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | HomePage.ts | Admin dashboard |
| `/admin/settings` | SettingsPage.ts | Admin settings |

**Internal Routing:**
```javascript
// src/index.ts
function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/admin/settings' || path.startsWith('/admin/settings/')) {
    return 'settings';
  }
  return 'home';
}
```

## Complete Route Table

| URL | App | Page | Level |
|-----|-----|------|-------|
| `/` | Hub | Dashboard | Hub |
| `/react` | React | Home | App |
| `/react/about` | React | About | App |
| `/vue2` | Vue 2 | Home | App |
| `/vue2/about` | Vue 2 | About | App |
| `/vue3` | Vue 3 | Home | App |
| `/vue3/about` | Vue 3 | About | App |
| `/ecommerce` | E-Commerce | Home | App |
| `/ecommerce/about` | E-Commerce | About | App |
| `/admin` | Admin | Dashboard | App |
| `/admin/settings` | Admin | Settings | App |

## How It Works

### 1. Hub Level (ESMX Router)
```javascript
// Router hanya tahu app-level routes
const router = new Router({
  routes: [
    { path: '/react', component: () => null },      // ← Hub handle
    { path: '/vue2', component: () => null },       // ← Hub handle
    { path: '/vue3', component: () => null },       // ← Hub handle
    { path: '/ecommerce', component: () => null },  // ← Hub handle
    { path: '/admin', component: () => null },      // ← Hub handle
  ]
});
```

### 2. App Level (Internal Router)
Setiap app memiliki internal routing logic:

**React Pattern:**
```javascript
const [currentPage, setCurrentPage] = useState(getCurrentPage);

useEffect(() => {
  window.addEventListener('popstate', handlePopState);
}, []);

return currentPage === 'about' 
  ? <AboutPage /> 
  : <HomePage />;
```

**Vue Pattern:**
```javascript
const currentPage = ref(getCurrentPage());

onMounted(() => {
  window.addEventListener('popstate', handlePopState);
});

return () => h(currentPage.value === 'about' ? AboutPage : HomePage);
```

### 3. Navigation Flow

**Scenario: User navigates from `/react` to `/react/about`**

```
1. User clicks link: /react/about
   ↓
2. Browser URL changes (no page reload)
   ↓
3. popstate event fired
   ↓
4. React App's handlePopState() called
   ↓
5. currentPage state updated to 'about'
   ↓
6. React re-renders with AboutPage
   ↓
7. User sees About page
```

**Scenario: User navigates from `/react/about` to `/vue3`**

```
1. User clicks link: /vue3
   ↓
2. Browser URL changes
   ↓
3. popstate event fired
   ↓
4. Hub's router.beforeEach() triggered
   ↓
5. Hub unmounts React app
   ↓
6. Hub mounts Vue 3 app
   ↓
7. Vue 3 App renders HomePage (default)
   ↓
8. User sees Vue 3 Home
```

## Key Benefits

1. **Separation of Concerns**
   - Hub: App switching
   - Apps: Internal page routing

2. **Framework Agnostic**
   - React, Vue 2, Vue 3 all use same pattern
   - Each app manages its own routing

3. **No Router Conflicts**
   - ESMX Router tidak perlu tahu internal pages
   - Tidak ada nested router complexity

4. **Simple & Predictable**
   - URL → App selection → Page selection
   - Clear hierarchy: Hub → App → Page

## Testing Routes

```bash
# Build all
pnpm build

# Start server
node esmx-server-manual.mjs

# Test URLs:
curl http://localhost:3000/react
curl http://localhost:3000/react/about
curl http://localhost:3000/vue2
curl http://localhost:3000/vue2/about
curl http://localhost:3000/vue3
curl http://localhost:3000/vue3/about
curl http://localhost:3000/ecommerce
curl http://localhost:3000/ecommerce/about
curl http://localhost:3000/admin
curl http://localhost:3000/admin/settings
```
