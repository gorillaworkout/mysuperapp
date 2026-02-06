import type { MicroAppConfig, RegisteredMicroApp, HubOptions, HubState, MountFunction } from './types';
import { getRegistry, MicroAppRegistry } from './MicroAppRegistry';
import { Router } from '@esmx/router';

export class MicroAppHub {
  private registry: MicroAppRegistry;
  private router: Router;
  private options: HubOptions;
  private state: HubState;
  private listeners: Set<(state: HubState) => void> = new Set();
  private unmountBeforeEach: (() => void) | null = null;
  private unmountAfterEach: (() => void) | null = null;

  constructor(router: Router, options: HubOptions = {}) {
    this.registry = getRegistry();
    this.router = router;
    this.options = {
      defaultContainer: '#app',
      enableSSR: false,
      loadingTimeout: 30000,
      ...options
    };
    this.state = {
      currentApp: null,
      currentPath: typeof window !== 'undefined' ? window.location.pathname : '/',
      isLoading: false,
      error: null
    };

    this.setupRouterHooks();
  }

  private setupRouterHooks(): void {
    this.unmountBeforeEach = this.router.beforeEach(async (to, from) => {
      const app = this.registry.getAppByPath(to.path);

      // If navigating to a different app, or navigating to a path with no app (e.g., Dashboard)
      if (this.state.currentApp) {
        if (!app || this.state.currentApp.name !== app.name) {
          this.unmountApp(this.state.currentApp.name);
        }
      }

      this.setState({ currentPath: to.path });
    });

    this.unmountAfterEach = this.router.afterEach((to) => {
      const app = this.registry.getAppByPath(to.path);
      if (app) {
        this.mountApp(app.name);
      } else {
        // No app for this path - clear currentApp to show Dashboard
        this.setState({ currentApp: null });
      }
    });
  }

  register(config: MicroAppConfig): RegisteredMicroApp {
    const app = this.registry.register(config);
    console.log(`[Hub] Registered app: ${config.name} at ${config.path}`);
    return app;
  }

  registerMultiple(configs: MicroAppConfig[]): RegisteredMicroApp[] {
    return configs.map(config => this.register(config));
  }

  async loadApp(name: string): Promise<RegisteredMicroApp | null> {
    const app = this.registry.getApp(name);
    if (!app) {
      console.error(`[Hub] App "${name}" not found`);
      return null;
    }

    if (app.isLoaded && app.module) {
      return app;
    }

    this.setState({ isLoading: true, error: null });

    try {
      const module = await app.loader();

      const updatedApp = this.registry.updateApp(name, {
        isLoaded: true,
        module,
        error: undefined
      });

      this.options.onAppLoad?.(updatedApp!);
      this.setState({ isLoading: false });

      return updatedApp || null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.registry.updateApp(name, { error: err });
      this.options.onAppError?.(app, err);
      this.setState({ isLoading: false, error: err });
      return null;
    }
  }

  async mountApp(name: string, container?: HTMLElement, props?: Record<string, any>): Promise<boolean> {
    const app = await this.loadApp(name);
    if (!app || !app.module) {
      return false;
    }

    const targetContainer = container || this.getDefaultContainer();
    if (!targetContainer) {
      console.error('[Hub] No container found for mounting');
      return false;
    }

    // Merge router into props if not present
    const mountProps = { ...props, router: this.router };

    if (app.mountInstance) {
      return true;
    }

    try {
      let mountFn: MountFunction;

      if (typeof app.module.mount === 'function') {
        mountFn = app.module.mount;
      } else if (typeof app.module.default === 'function') {
        mountFn = app.module.default;
      } else {
        console.error(`[Hub] App "${name}" does not export a mount function`);
        return false;
      }

      const instance = mountFn(targetContainer, mountProps);

      this.registry.updateApp(name, { mountInstance: instance });
      this.setState({ currentApp: app });

      return true;
    } catch (error) {
      console.error(`[Hub] Failed to mount app "${name}":`, error);
      return false;
    }
  }

  unmountApp(name: string): boolean {
    const app = this.registry.getApp(name);
    if (!app || !app.mountInstance) {
      return false;
    }

    try {
      app.mountInstance.unmount();
      this.registry.updateApp(name, { mountInstance: undefined });

      if (this.state.currentApp?.name === name) {
        this.setState({ currentApp: null });
      }

      return true;
    } catch (error) {
      console.error(`[Hub] Failed to unmount app "${name}":`, error);
      return false;
    }
  }

  async navigateToPath(path: string): Promise<boolean> {
    try {
      await this.router.push(path);
      return true;
    } catch (error) {
      console.error(`[Hub] Navigation failed:`, error);
      return false;
    }
  }

  getApp(name: string): RegisteredMicroApp | undefined {
    return this.registry.getApp(name);
  }

  getAppByPath(path: string): RegisteredMicroApp | undefined {
    return this.registry.getAppByPath(path);
  }

  getAllApps(): RegisteredMicroApp[] {
    return this.registry.getAllApps();
  }

  getState(): HubState {
    return { ...this.state };
  }

  subscribe(listener: (state: HubState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private setState(updates: Partial<HubState>): void {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  private getDefaultContainer(): HTMLElement | null {
    if (typeof window === 'undefined') return null;
    return document.querySelector(this.options.defaultContainer!);
  }

  unregister(name: string): boolean {
    this.unmountApp(name);
    return this.registry.unregister(name);
  }

  destroy(): void {
    this.registry.getAllApps().forEach(app => {
      if (app.mountInstance) {
        app.mountInstance.unmount();
      }
    });
    this.registry.clear();
    this.listeners.clear();

    if (this.unmountBeforeEach) {
      this.unmountBeforeEach();
    }
    if (this.unmountAfterEach) {
      this.unmountAfterEach();
    }
  }
}

let globalHub: MicroAppHub | null = null;

export function createHub(router: Router, options?: HubOptions): MicroAppHub {
  if (!globalHub) {
    globalHub = new MicroAppHub(router, options);
  }
  return globalHub;
}

export function getHub(): MicroAppHub | null {
  return globalHub;
}

export function resetHub(): void {
  globalHub?.destroy();
  globalHub = null;
}
