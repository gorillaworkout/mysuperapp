# 🚀 ESMX Super App

Micro-frontend architecture with ESMX Federation - deployed on Railway.

## 📚 Documentation

All documentation is located in the `docs/` folder:

- **[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Complete guide for adding new projects
- **[Cara Menjalankan](CARA-JALANKAN.md)** - Panduan menjalankan di local (Bahasa Indonesia)
- **[Dokumentasi ESMX](DOKUMENTASI-ESMX.md)** - Dokumentasi arsitektur ESMX
- **[Project Status](PROJECT_STATUS.md)** - Status project dan deployment
- **[Executive Summary](EXECUTIVE-SUMMARY.md)** - Ringkasan eksekutif
- **[Testing Guide](README-TESTING.md)** - Panduan testing

## 🏗️ Architecture

**Hub & Spokes Pattern** dengan 3 Active Projects:

| Project | Framework | URL Path | Status |
|---------|-----------|----------|--------|
| ssr-react | React 18 | `/react` | ✅ Active |
| ssr-vue2 | Vue 2.7 | `/vue2` | ✅ Active |
| ssr-vue3 | Vue 3.3 | `/vue3` | ✅ Active |

**Shared Packages:**
- `ssr-npm-base` - Base utilities
- `ssr-npm-react` - React shared dependencies
- `ssr-npm-vue2` - Vue 2 shared dependencies
- `ssr-npm-vue3` - Vue 3 shared dependencies

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start server
node server.mjs
```

Open http://localhost:3000

## 🌐 Live Deployment

**Railway URL:** https://perceptive-compassion-production.up.railway.app

## 📦 Project Structure

```
esmx-demo/
├── docs/                      # Documentation
│   └── DEVELOPER_GUIDE.md    # Complete developer guide
├── my-super-app/             # All applications
│   ├── ssr-hub/             # Entry point & dashboard
│   ├── ssr-react/           # React SSR app
│   ├── ssr-vue2/            # Vue 2.7 SSR app
│   ├── ssr-vue3/            # Vue 3.3 SSR app
│   └── ssr-npm-*/           # Shared packages
├── public/                   # Static HTML files
├── server.mjs               # Node.js server
└── Dockerfile               # Docker configuration
```

## ➕ Adding New Projects

See **[Developer Guide](docs/DEVELOPER_GUIDE.md)** for complete step-by-step instructions.

Quick checklist:
1. Create project directory
2. Create package.json (use `ts-loader`)
3. Create rspack config (add `noParse: /node_modules/`)
4. Create source files
5. Create HTML file in `public/`
6. Update `server.mjs` route
7. Update `public/index.html` card
8. Update `Dockerfile` COPY command
9. Install & build: `pnpm install && pnpm build`
10. Test locally then deploy

## 🛠️ Tech Stack

- **Framework:** ESMX v3.0.0-rc.107
- **Bundler:** Rspack
- **Runtime:** Node.js 24
- **Package Manager:** PNPM
- **Container:** Docker (Alpine Linux)
- **Deployment:** Railway

## 📝 License

MIT
