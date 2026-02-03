export class MicroAppRegistry {
  constructor() {
    this.apps = new Map();
    this.pathIndex = new Map();
  }

  register(config) {
    if (this.apps.has(config.name)) {
      console.warn(`[Hub] App "${config.name}" is already registered. Overwriting...`);
    }

    if (this.pathIndex.has(config.path)) {
      const existingApp = this.pathIndex.get(config.path);
      console.warn(`[Hub] Path "${config.path}" is already registered by "${existingApp}". Overwriting...`);
    }

    const app = {
      ...config,
      isLoaded: false,
      module: undefined,
      error: undefined,
      mountInstance: undefined
    };

    this.apps.set(config.name, app);
    this.pathIndex.set(config.path, config.name);

    console.log(`[Hub] Registered app: ${config.name} at ${config.path}`);
    return app;
  }

  unregister(name) {
    const app = this.apps.get(name);
    if (!app) {
      console.warn(`[Hub] Cannot unregister: App "${name}" not found`);
      return false;
    }

    if (app.mountInstance) {
      app.mountInstance.unmount();
    }

    this.pathIndex.delete(app.path);
    this.apps.delete(name);

    console.log(`[Hub] Unregistered app: ${name}`);
    return true;
  }

  getApp(name) {
    return this.apps.get(name);
  }

  getAppByPath(path) {
    let matchedApp = undefined;
    let matchedLength = 0;

    for (const app of this.apps.values()) {
      if (path === app.path || path.startsWith(app.path + '/')) {
        if (app.path.length > matchedLength) {
          matchedLength = app.path.length;
          matchedApp = app;
        }
      }
    }

    return matchedApp;
  }

  getAllApps() {
    return Array.from(this.apps.values());
  }

  updateApp(name, updates) {
    const app = this.apps.get(name);
    if (!app) {
      console.warn(`[Hub] Cannot update: App "${name}" not found`);
      return undefined;
    }

    const updatedApp = { ...app, ...updates };
    this.apps.set(name, updatedApp);
    return updatedApp;
  }

  hasApp(name) {
    return this.apps.has(name);
  }

  get count() {
    return this.apps.size;
  }

  clear() {
    for (const app of this.apps.values()) {
      if (app.mountInstance) {
        app.mountInstance.unmount();
      }
    }

    this.apps.clear();
    this.pathIndex.clear();
    console.log('[Hub] Registry cleared');
  }
}

let globalRegistry = null;

export function getRegistry() {
  if (!globalRegistry) {
    globalRegistry = new MicroAppRegistry();
  }
  return globalRegistry;
}

export function resetRegistry() {
  globalRegistry?.clear();
  globalRegistry = null;
}
