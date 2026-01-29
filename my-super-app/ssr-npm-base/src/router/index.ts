// Core Router Implementation - Singleton Router
export class Router {
  private static instance: Router;
  private routes: Map<string, any> = new Map();
  private listeners: Array<(route: any) => void> = [];
  private currentRoute: any = null;

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.setupNavigation();
  }

  static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  private setupNavigation() {
    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });
  }

  addRoute(path: string, component: any, meta?: any) {
    this.routes.set(path, { component, meta });
  }

  push(path: string, replace = false) {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    this.handleRouteChange();
  }

  private handleRouteChange() {
    const path = window.location.pathname;
    const route = this.routes.get(path) || this.routes.get('/');
    this.currentRoute = route;
    this.notifyListeners(route);
  }

  private notifyListeners(route: any) {
    this.listeners.forEach(listener => listener(route));
  }

  onRouteChange(listener: (route: any) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

export interface RouteConfig {
  path: string;
  component: any;
  meta?: Record<string, any>;
  children?: RouteConfig[];
}

// Async Data Loading Support
export interface AsyncDataContext {
  params: Record<string, string>;
  query: Record<string, string>;
}

export interface AsyncDataResult {
  data: any;
  error?: Error;
}

export type AsyncDataLoader = (ctx: AsyncDataContext) => Promise<any>;

// Extend route to support async data
export interface RouteConfigWithAsync extends RouteConfig {
  asyncData?: AsyncDataLoader;
  loader?: AsyncDataLoader;
}

// Helper untuk SSR data pre-fetching
export async function prefetchRouteData(
  path: string,
  routeConfig: RouteConfigWithAsync,
  context: AsyncDataContext
): Promise<AsyncDataResult> {
  try {
    const loader = routeConfig.asyncData || routeConfig.loader;
    if (!loader) {
      return { data: null };
    }
    
    const data = await loader(context);
    return { data };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// Route metadata untuk SSR
export interface RouteMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  loader?: AsyncDataLoader;
  asyncData?: AsyncDataLoader;
}

// Hydration context untuk client-side
export interface HydrationContext {
  route: string;
  data?: any;
  params: Record<string, string>;
  query: Record<string, string>;
}
