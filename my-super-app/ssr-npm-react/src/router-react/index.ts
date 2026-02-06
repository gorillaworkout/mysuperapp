import React, { createContext, useContext, useEffect, useState } from 'react';
import { Router } from '@esmx/router';

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
  // router.route is a getter.
  const [route, setRoute] = useState(() => {
    try {
      return router.route;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    // router.afterEach returns unsubscribe
    const unsubscribe = router.afterEach((to) => {
      setRoute(to);
    });
    // In case navigation happened before effect but after state init
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
  children: React.ReactNode;
}

export const RouterLink: React.FC<RouterLinkProps> = ({
  to,
  replace = false,
  activeClass,
  className,
  children
}) => {
  const localRouter = useRouter();
  const sharedRouter = useSharedRouter();
  const currentRoute = useRoute();

  const path = typeof to === 'string' ? to : to.path;
  const isActive = currentRoute?.path === path; // Check exact match or use isRouteMatched if available? path usually includes query? No, path is path.

  const classes = [className];
  if (isActive && activeClass) {
    classes.push(activeClass);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Determine if this is a cross-app navigation (path doesn't match current app's routes)
    const currentPath = currentRoute?.path || '';
    const currentAppPrefix = currentPath.split('/').slice(0, 2).join('/'); // e.g., "/react"
    const isCrossAppNavigation = !path.startsWith(currentAppPrefix) || path === '/';
    
    if (sharedRouter) {
      // Hub context: use sharedRouter for all navigation
      if (replace) {
        sharedRouter.replace(path);
      } else {
        sharedRouter.push(path);
      }
    } else if (isCrossAppNavigation) {
      // No sharedRouter + cross-app navigation: use window.location for full page navigation
      if (replace) {
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    } else {
      // No sharedRouter + same-app navigation: use localRouter
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
    className: classes.join(' ').trim() || undefined
  }, children);
};


export const RouterView: React.FC = () => {
  const currentRoute = useRoute();

  if (!currentRoute) {
    return null;
  }

  // Route does not have .component directly.
  // It has .matched array of config objects which have .component
  // Use the last match? or first? usually matched contains all matched segments.
  // For single view, we probably want the most specific one i.e. last one? or first?
  // Hub routes are flat.
  const matched = currentRoute.matched;
  if (!matched || matched.length === 0) return null;

  // Assuming the component is on the last matched segment for now
  const component = matched[matched.length - 1].component;

  // Cast component to any or React Component type
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