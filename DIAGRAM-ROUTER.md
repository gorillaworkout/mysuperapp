# 🎨 Diagram Visual: React Router & Vue Router

## 📁 Struktur File

```
public/index.html
│
├─ <head>
│   └─ <script type="importmap">     ← Import libraries
│       ├─ react, react-dom
│       ├─ react-router-dom?deps=... ← PENTING: deps parameter!
│       ├─ vue
│       └─ vue-router?deps=...       ← PENTING: deps parameter!
│
└─ <body>
    ├─ <div id="app"></div>          ← Mount point
    │
    └─ <script type="module">
        │
        ├─ Route Detection Logic     ← Pilih router berdasarkan URL
        │   ├─ if (isVueRoute)
        │   │   └─ Vue Router Setup
        │   └─ else
        │       └─ React Router Setup
        │
        ├─ Vue Router Section (Baris 48-236)
        │   ├─ VueHeader component
        │   ├─ VueFooter component
        │   ├─ VueDashboard component
        │   ├─ VueMicroApp component
        │   ├─ Router configuration
        │   └─ Mount Vue app
        │
        └─ React Router Section (Baris 238-439)
            ├─ Header component
            ├─ Footer component
            ├─ Dashboard component
            ├─ MicroApp component
            ├─ Routes definition
            └─ Render React app
```

## 🔄 Flow Diagram: Initial Page Load

```
┌─────────────────────────────────────────────┐
│  User buka URL                              │
│  http://localhost:3000/vue2                 │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Server (server.mjs)                        │
│  - Match route: *                           │
│  - Send: public/index.html                  │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Browser parse HTML                         │
│  - Load Tailwind CSS                        │
│  - Parse import map                         │
│  - Execute <script type="module">           │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Route Detection (Baris 44-46)              │
│                                             │
│  const path = window.location.pathname;    │
│  // path = "/vue2"                          │
│                                             │
│  const isVueRoute = ['/vue2', '/vue3',     │
│    '/ecommerce', '/admin']                 │
│    .some(route => path.startsWith(route)); │
│  // isVueRoute = true ✅                    │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  if (isVueRoute) ← TRUE!                    │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Load Vue Router (Baris 48-236)             │
│                                             │
│  1. Import dari CDN:                        │
│     - vue@3.5.13                            │
│     - vue-router@4.2.5                      │
│                                             │
│  2. Define components:                      │
│     - VueHeader                             │
│     - VueFooter                             │
│     - VueDashboard                          │
│     - VueMicroApp                           │
│                                             │
│  3. Create router:                          │
│     const router = createRouter({           │
│       history: createWebHistory(),          │
│       routes: [                             │
│         { path: '/', component: ... },      │
│         { path: '/:appName', component: ...}│
│       ]                                     │
│     });                                     │
│                                             │
│  4. Create Vue app:                         │
│     const app = createApp(VueApp);          │
│     app.use(router);                        │
│     app.mount('#app');                      │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Vue Router Match Route                     │
│                                             │
│  Current URL: /vue2                         │
│  Match: { path: '/:appName',                │
│          component: VueMicroApp }           │
│                                             │
│  Extract params:                            │
│  - appName = "vue2"                         │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Render VueMicroApp                         │
│                                             │
│  <div id="app">                             │
│    <div class="min-h-screen">              │
│      <VueHeader />                          │
│      <main>                                 │
│        <router-view>                        │
│          ↓                                  │
│          <VueMicroApp />  ← Rendered here!  │
│            - Icon: 🌿                       │
│            - Title: Vue 2.7 Classic         │
│            - Route: /vue2                   │
│            - Features: [...]                │
│        </router-view>                       │
│      </main>                                │
│      <VueFooter />                          │
│    </div>                                   │
│  </div>                                     │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  ✅ Page Displayed!                         │
│  Console: ✅ Vue Router v4 initialized      │
└─────────────────────────────────────────────┘
```

## 🖱️ Flow Diagram: Client-Side Navigation

```
┌─────────────────────────────────────────────┐
│  User di page /vue2                         │
│  Vue Router active                          │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  User klik <router-link to="/vue3">         │
│  (Link "Vue 3" di header)                   │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Vue Router intercept click event           │
│  - preventDefault() ← Prevent page reload   │
│  - Update browser URL                       │
│  - Trigger route change                     │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  window.history.pushState()                 │
│                                             │
│  Before: http://localhost:3000/vue2         │
│  After:  http://localhost:3000/vue3         │
│                                             │
│  ⚠️ NO PAGE RELOAD!                         │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Vue Router match new route                 │
│                                             │
│  URL: /vue3                                 │
│  Match: { path: '/:appName',                │
│          component: VueMicroApp }           │
│                                             │
│  Extract params:                            │
│  - appName = "vue3"                         │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Vue update <router-view>                   │
│                                             │
│  <router-view>                              │
│    Before: <VueMicroApp appName="vue2" />   │
│    After:  <VueMicroApp appName="vue3" />   │
│  </router-view>                             │
│                                             │
│  ⚡ Component re-rendered with new data!    │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  VueMicroApp computed property              │
│                                             │
│  computed: {                                │
│    app() {                                  │
│      const appName =                        │
│        this.$route.params.appName;          │
│      // appName = "vue3" ✅                 │
│                                             │
│      const apps = {                         │
│        'vue2': { icon: '🌿', ... },         │
│        'vue3': { icon: '💜', ... } ← This!  │
│      };                                     │
│                                             │
│      return apps[appName];                  │
│    }                                        │
│  }                                          │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  ✅ Page Updated!                           │
│  - Icon changed: 🌿 → 💜                    │
│  - Title: Vue 2.7 Classic → Vue 3 Comp...   │
│  - URL: /vue2 → /vue3                       │
│  - NO PAGE RELOAD! ⚡                       │
└─────────────────────────────────────────────┘
```

## 🔀 Flow Diagram: Cross-Framework Navigation (Current Limitation)

```
┌─────────────────────────────────────────────┐
│  User di page /vue2 (Vue Router active)     │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  User klik link "React" di header           │
│  <router-link to="/react">React</router-link>│
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Vue Router intercept click                 │
│  - URL change: /vue2 → /react               │
│  - Try to match route in Vue Router         │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Vue Router match route                     │
│                                             │
│  URL: /react                                │
│  Match: { path: '/:appName',                │
│          component: VueMicroApp }           │
│                                             │
│  Extract params:                            │
│  - appName = "react" ← Vue thinks this is   │
│                        just another appName!│
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  ⚠️ PROBLEM: Vue Router still active!       │
│                                             │
│  VueMicroApp rendered with:                 │
│  - appName = "react"                        │
│  - Shows Vue page, not React!               │
│                                             │
│  ❌ React Router tidak pernah di-load!      │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  ✅ Solution 1: Ubah jadi <a> tag           │
│                                             │
│  <a href="/react">React</a>                 │
│  - Trigger full page reload                 │
│  - Route detection jalan lagi               │
│  - React Router initialized                 │
└─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  ✅ Solution 2: Manual refresh              │
│                                             │
│  User press F5 or Ctrl+R                    │
│  - Page reload                              │
│  - Route detection: isVueRoute = false      │
│  - React Router initialized                 │
└─────────────────────────────────────────────┘
```

## 🎯 Component Hierarchy

### Vue Router Hierarchy

```
VueApp (Root)
│
├─ VueHeader
│   └─ <nav>
│       ├─ <router-link to="/">Home</router-link>
│       ├─ <router-link to="/react">React</router-link>
│       ├─ <router-link to="/vue2">Vue 2</router-link>
│       ├─ <router-link to="/vue3">Vue 3</router-link>
│       ├─ <router-link to="/ecommerce">E-Commerce</router-link>
│       └─ <router-link to="/admin">Admin</router-link>
│
├─ <router-view> ← Vue Router renders component here
│   │
│   ├─ Route: /
│   │   └─ VueDashboard
│   │       ├─ Header with badges
│   │       └─ Grid of app cards
│   │
│   └─ Route: /:appName (e.g., /vue2)
│       └─ VueMicroApp
│           ├─ Hero section with icon & title
│           ├─ Features grid
│           ├─ Router info box
│           └─ Navigation buttons
│               ├─ ← Back (this.$router.back())
│               └─ 🏠 Dashboard (this.$router.push('/'))
│
└─ VueFooter
    └─ Copyright text
```

### React Router Hierarchy

```
App (Root with <BrowserRouter>)
│
├─ Header
│   └─ <nav>
│       ├─ <Link to="/">Home</Link>
│       ├─ <Link to="/react">React</Link>
│       ├─ <Link to="/vue2">Vue 2</Link>
│       ├─ <Link to="/vue3">Vue 3</Link>
│       ├─ <Link to="/ecommerce">E-Commerce</Link>
│       └─ <Link to="/admin">Admin</Link>
│
├─ <Routes> ← React Router matches routes here
│   │
│   ├─ <Route path="/">
│   │   └─ Dashboard
│   │       ├─ Header with badges
│   │       └─ Grid of app cards
│   │
│   └─ <Route path="/:appName"> (e.g., /react)
│       └─ MicroApp
│           ├─ const { appName } = useParams()
│           ├─ const navigate = useNavigate()
│           ├─ Hero section with icon & title
│           ├─ Features grid
│           ├─ Router info box
│           └─ Navigation buttons
│               ├─ ← Back (navigate(-1))
│               └─ 🏠 Dashboard (navigate('/'))
│
└─ Footer
    └─ Copyright text
```

## 📊 Route Mapping Table

| URL | isVueRoute | Router Active | Component Rendered | Can Navigate To |
|-----|------------|---------------|-------------------|-----------------|
| `/` | `false` | React Router | Dashboard (React) | /, /react |
| `/react` | `false` | React Router | MicroApp (React) | /, /react |
| `/vue2` | `true` | Vue Router | VueMicroApp (Vue) | /, /vue2, /vue3, /ecommerce, /admin |
| `/vue3` | `true` | Vue Router | VueMicroApp (Vue) | /, /vue2, /vue3, /ecommerce, /admin |
| `/ecommerce` | `true` | Vue Router | VueMicroApp (Vue) | /, /vue2, /vue3, /ecommerce, /admin |
| `/admin` | `true` | Vue Router | VueMicroApp (Vue) | /, /vue2, /vue3, /ecommerce, /admin |

## 🔑 Key Takeaways

1. **One Router Per Page Load**
   - Initial URL menentukan router mana yang di-load
   - Setelah load, tidak bisa switch router tanpa reload

2. **Router-Specific Navigation**
   - React Router: `<Link>`, `useNavigate()`, `useParams()`
   - Vue Router: `<router-link>`, `$router`, `$route`

3. **Import Map Critical**
   - `?deps=` parameter **WAJIB** untuk avoid version conflict
   - Tanpa ini → React/Vue bundled 2x → error

4. **Dynamic Routes Work**
   - `/:appName` works di kedua router
   - Parameter extraction:
     - React: `useParams().appName`
     - Vue: `this.$route.params.appName`

5. **Browser History API**
   - Kedua router pakai `window.history.pushState()`
   - Back/forward button works
   - No page reload on same-router navigation
