# Cara Menjalankan Project ESMX

## 1. Development Mode (Untuk Coding)

```bash
cd /Users/bayudarmawan/Documents/belajar/esmx-demo
pnpm dev
```

Semua package akan auto-rebuild saat ada perubahan file.

## 2. Build Mode (Untuk Production)

```bash
cd /Users/bayudarmawan/Documents/belajar/esmx-demo
pnpm build
```

## 3. Lihat di Browser (Setelah Build)

```bash
cd my-super-app/ssr-hub
npx serve dist
# Buka http://localhost:3000
```

**Atau pakai Python:**
```bash
cd my-super-app/ssr-hub/dist
python3 -m http.server 3000
```

**Atau pakai Node.js:**
```bash
cd my-super-app/ssr-hub/dist
npx http-server -p 3000
```

## Ringkasan Perintah

| Tujuan | Perintah |
|--------|----------|
| Development | `pnpm dev` |
| Build | `pnpm build` |
| Serve | `cd my-super-app/ssr-hub && npx serve dist` |
| Test di browser | Buka http://localhost:3000 |

## Status Project

✅ **8/8 packages build successfully**
✅ **Architecture complete**  
✅ **Ready for development & deployment**

Selamat mencoba! 🚀
