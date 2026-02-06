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
  
  const [localRouter] = React.useState(() => {
    if (isSSR && props.router) {
      return props.router;
    }
    
    const r = new Router({
      mode: RouterMode.history,
      routes: [
        { path: '/react', component: HomePage },
        { path: '/react/about', component: AboutPage }
      ]
    });

    if (!isSSR) {
      r.push(window.location.pathname);
    }

    return r;
  });

  const sharedRouter = isSSR ? null : (props.router || null);

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
