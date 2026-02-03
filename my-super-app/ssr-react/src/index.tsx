import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';

function getCurrentPage() {
  if (typeof window === 'undefined') {
    return 'home';
  }
  const path = window.location.pathname;
  if (path === '/react/about' || path.startsWith('/react/about/')) {
    return 'about';
  }
  return 'home';
}

export function App(props) {
  const initialPage = props.initialPage || getCurrentPage();
  const [currentPage, setCurrentPage] = React.useState(() => initialPage);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return React.createElement(
    'div',
    null,
    currentPage === 'about' 
      ? React.createElement(AboutPage) 
      : React.createElement(HomePage)
  );
}

export function mount(container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
  
  return {
    unmount: () => {
      root.unmount();
    }
  };
}

export default mount;

export { HomePage, AboutPage };
