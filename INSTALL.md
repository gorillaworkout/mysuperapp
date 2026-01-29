
## ⚠️ ESMX v3 Pattern Convention

**IMPORTANT: When exporting modules in `entry.node.ts`:**

✅ **CORRECT:** Use without `"./"` prefix
```typescript
exports: [
  "pages/HomePage",  // ✅ Correct
  "pages/AboutPage"  // ✅ Correct
]
```

❌ **INCORRECT:** Do NOT use `"./"` prefix
```typescript
exports: [  
  "./pages/HomePage",  // ❌ Wrong - ESMX v3 convention
  "./pages/AboutPage"  // ❌ Wrong - ESMX v3 convention
]
```

**Provider exports also follow this convention:**
```typescript
exports: [
  "pkg:react",        // ✅ Correct
  "pkg:vue",          // ✅ Correct
  "@esmx/router"      // ✅ Correct
]
```

This is a subtle but critical convention in ESMX v3's module resolution system.
