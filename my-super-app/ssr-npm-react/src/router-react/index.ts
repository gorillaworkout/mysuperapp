import React, { createContext, useContext, useEffect, useState } from 'react';
import { Router } from '@esmx/router';

const RouterContext = createContext<Router | null>(null);

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
  const router = useRouter();
  const currentRoute = useRoute();

  const path = typeof to === 'string' ? to : to.path;
  const isActive = currentRoute?.path === path; // Check exact match or use isRouteMatched if available? path usually includes query? No, path is path.

  const classes = [className];
  if (isActive && activeClass) {
    classes.push(activeClass);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (replace) {
      router.replace(path);
    } else {
      router.push(path);
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
  router: Router; // Required
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({
  router,
  children
}) => {
  if (!router) {
    console.warn("RouterProvider requires a 'router' prop.");
    return null;
  }
  return React.createElement(RouterContext.Provider, { value: router }, children);
};