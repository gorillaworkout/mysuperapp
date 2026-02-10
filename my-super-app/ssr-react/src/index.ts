import { 
  React, 
  Router, 
  RouterMode,
  RouterProvider, 
  RouterView 
} from 'ssr-npm-react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

export function App(props: { router?: Router }) {
  const isSSR = typeof window === 'undefined';
  const isHubMode = !isSSR && !!(window as any).__ESMX_HUB_MODE__;
  
  const [localRouter] = React.useState(() => {
    const r = new Router({
      mode: isHubMode ? RouterMode.memory : RouterMode.history,
      routes: [
        { path: '/react', component: HomePage },
        { path: '/react/about', component: AboutPage }
      ]
    });

    if (!isSSR) {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/react')) {
        r.replace(currentPath);
      } else {
        r.replace('/react');
      }
    }

    return r;
  });

  const sharedRouter = isSSR ? null : (props.router || null);

  React.useEffect(() => {
    if (!sharedRouter || !isHubMode) return;
    
    const unsubscribe = sharedRouter.afterEach((to: { path: string }) => {
      const currentPath = localRouter.route?.path || '';
      if (to.path.startsWith('/react') && to.path !== currentPath) {
        localRouter.replace(to.path);
      }
    });
    
    return unsubscribe;
  }, [sharedRouter, localRouter, isHubMode]);

  return React.createElement(RouterProvider, {
    router: localRouter,
    sharedRouter: sharedRouter,
    children: React.createElement(RouterView)
  });
}

export function mount(container: HTMLElement, props?: { router?: Router }) {
  const root = createRoot(container);
  root.render(React.createElement(App, props || {}));

  return {
    unmount: () => {
      root.unmount();
    }
  };
}

export default mount;

export { HomePage, AboutPage };
