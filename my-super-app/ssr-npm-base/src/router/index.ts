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