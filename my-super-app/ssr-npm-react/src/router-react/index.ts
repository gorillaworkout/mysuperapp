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
  const [route, setRoute] = useState(() => router.getCurrentRoute());

  useEffect(() => {
    const unsubscribe = router.onRouteChange(setRoute);
    return unsubscribe;
  }, [router]);

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
  const isActive = currentRoute?.component && path === window.location.pathname;
  
  const classes = [className];
  if (isActive && activeClass) {
    classes.push(activeClass);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(path, replace);
  };

  return (
    <a 
      href={path} 
      onClick={handleClick}
      className={classes.join(' ').trim() || undefined}
    >
      {children}
    </a>
  );
};


export const RouterView: React.FC = () => {
  const currentRoute = useRoute();
  
  if (!currentRoute) {
    return null;
  }

  const { component: Component } = currentRoute;
  return <Component />;
};

export interface RouterProviderProps {
  router?: Router;
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ 
  router = Router.getInstance(), 
  children 
}) => {
  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  );
};