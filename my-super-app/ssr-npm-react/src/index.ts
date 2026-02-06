import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Router, RouterMode } from '@esmx/router';
import type { Route, RouteConfig } from '@esmx/router';

export { React, ReactDOM, Router, RouterMode };
export type { Route, RouteConfig };

// Inline router-react implementation to ensure proper bundling for SSR
const RouterContext = createContext<Router | null>(null);
const SharedRouterContext = createContext<Router | null>(null);

export function useSharedRouter(): Router | null {
  return useContext(SharedRouterContext);
}

export function useRouter(): Router {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return router;
}

export function useRoute() {
  const router = useRouter();
  const [route, setRoute] = useState(() => {
    try {
      return router.route;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const unsubscribe = router.afterEach((to) => {
      setRoute(to);
    });
    try {
      if (router.route !== route) {
        setRoute(router.route);
      }
    } catch (e) { }
    return unsubscribe;
  }, [router, route]);

  return route;
}

export interface RouterLinkProps {
  to: string | { path: string; query?: Record<string, string> };
  replace?: boolean;
  activeClass?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const RouterLink: React.FC<RouterLinkProps> = ({
  to,
  replace = false,
  activeClass,
  className,
  style,
  children
}) => {
  const localRouter = useRouter();
  const sharedRouter = useSharedRouter();
  const currentRoute = useRoute();

  const path = typeof to === 'string' ? to : to.path;
  const isActive = currentRoute?.path === path;

  const classes = [className];
  if (isActive && activeClass) {
    classes.push(activeClass);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const currentPath = currentRoute?.path || '';
    const currentAppPrefix = currentPath.split('/').slice(0, 2).join('/');
    const isCrossAppNavigation = !path.startsWith(currentAppPrefix) || path === '/';
    
    if (sharedRouter) {
      if (replace) {
        sharedRouter.replace(path);
      } else {
        sharedRouter.push(path);
      }
    } else if (isCrossAppNavigation) {
      if (replace) {
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    } else {
      if (replace) {
        localRouter.replace(path);
      } else {
        localRouter.push(path);
      }
    }
  };

  return React.createElement('a', {
    href: path,
    onClick: handleClick,
    className: classes.join(' ').trim() || undefined,
    style
  }, children);
};

export const RouterView: React.FC = () => {
  const currentRoute = useRoute();

  if (!currentRoute) {
    return null;
  }

  const matched = currentRoute.matched;
  if (!matched || matched.length === 0) return null;

  const component = matched[matched.length - 1].component;
  const Component = component as React.ComponentType<any>;

  if (!Component) return null;

  return React.createElement(Component);
};

export interface RouterProviderProps {
  router: Router;
  sharedRouter?: Router | null;
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({
  router,
  sharedRouter = null,
  children
}) => {
  if (!router) {
    console.warn("RouterProvider requires a 'router' prop.");
    return null;
  }
  return React.createElement(
    SharedRouterContext.Provider,
    { value: sharedRouter },
    React.createElement(RouterContext.Provider, { value: router }, children)
  );
};
