# 🧪 Test Router Implementation

## Test 1: React Router (Homepage)

1. Jalankan server:
   ```bash
   node server.mjs
   ```

2. Buka browser: `http://localhost:3000/`

3. ✅ Check:
   - Console log: `✅ React Router v6 initialized`
   - Badge di page: `✅ React Router v6 Active`
   - Header navigation ada 5 links

4. Klik card "React SSR":
   - URL berubah ke `/react` (tanpa reload!)
   - Page berganti ke React app detail
   - Klik "Back" → kembali ke dashboard
   - Klik "🏠 Dashboard" → kembali ke dashboard

5. Browser back/forward button:
   - Klik browser back → kembali ke dashboard
   - Klik browser forward → ke /react lagi

## Test 2: Vue Router (Vue Routes)

1. Buka browser: `http://localhost:3000/vue2`

2. ✅ Check:
   - Console log: `✅ Vue Router v4 initialized`
   - Badge di page: `✅ Vue Router v4 Active`
   - Page title: "Vue 2.7 Classic"

3. Klik link di header:
   - Klik "Vue 3" → URL ke `/vue3` (tanpa reload!)
   - Klik "E-Commerce" → URL ke `/ecommerce` (tanpa reload!)
   - Klik "Admin" → URL ke `/admin` (tanpa reload!)

4. Klik "← Back" button:
   - Kembali ke route sebelumnya

5. Browser back/forward button:
   - Works! Navigation history tersimpan

## Test 3: Route Parameter

1. Buka: `http://localhost:3000/vue3`

2. ✅ Check di console:
   ```javascript
   // Di browser console, ketik:
   console.log(window.location.pathname); // Output: "/vue3"
   ```

3. Page content:
   - Icon: 💜
   - Title: "Vue 3 Composition"
   - Route: /vue3
   - Features: Composition API, Teleport, Fragments, Suspense

## Test 4: Cross-Framework Navigation

1. Buka: `http://localhost:3000/` (React)

2. Klik link "Vue 2" di header

3. ⚠️ Expected behavior:
   - URL tetap `/vue2`
   - Tapi React Router masih aktif
   - Page masih render React MicroApp
   - **TIDAK switch ke Vue Router**

4. Untuk benar-benar ke Vue route:
   - Refresh page (F5)
   - Atau buka `/vue2` di tab baru
   - Atau ubah link jadi `<a href="/vue2">` (full reload)

## Test 5: Direct URL Access

1. Buka langsung: `http://localhost:3000/ecommerce`
   - ✅ Vue Router active
   - ✅ E-Commerce page rendered

2. Buka langsung: `http://localhost:3000/react`
   - ✅ React Router active
   - ✅ React app page rendered

## Test 6: Programmatic Navigation

### Vue Router Test

1. Buka: `http://localhost:3000/vue2`

2. Buka browser console

3. Test navigation:
   ```javascript
   // Tidak bisa, karena kita tidak expose router ke window
   // Tapi bisa test dengan klik button "🏠 Dashboard"
   ```

4. Klik "🏠 Dashboard" button:
   - URL berubah ke `/`
   - Page ke dashboard (Vue Dashboard)

### React Router Test

1. Buka: `http://localhost:3000/react`

2. Klik "← Back" button:
   - `navigate(-1)` dipanggil
   - Kembali ke route sebelumnya

3. Klik "🏠 Dashboard":
   - `navigate('/')` dipanggil
   - Ke homepage

## 🎯 Summary Checklist

- ✅ React Router works for `/`, `/react`
- ✅ Vue Router works for `/vue2`, `/vue3`, `/ecommerce`, `/admin`
- ✅ Route parameters work (`/:appName`)
- ✅ Browser back/forward work
- ✅ Direct URL access work
- ✅ No page reload on navigation (within same router)
- ⚠️ Cross-framework navigation needs page reload

## 🐛 Common Issues

### Issue 1: Console error "Cannot read properties of null (reading 'useRef')"

**Solution:** Import map harus ada `?deps=`:
```javascript
"react-router-dom": "https://esm.sh/react-router-dom@6.22.0?deps=react@18.3.1,react-dom@18.3.1"
```

### Issue 2: Klik link Vue dari React page tidak work

**Expected:** Ini by design! Harus refresh atau ubah jadi `<a href="...">`.

### Issue 3: Page blank setelah navigation

**Check:**
1. Browser console untuk error
2. Network tab → cek CDN loads
3. Hard refresh (Ctrl+Shift+R)
