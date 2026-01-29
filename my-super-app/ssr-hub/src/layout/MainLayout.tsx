import React, { useState, useEffect } from 'react';
import { RouterLink, RouterView, RouterProvider, useRouter } from '@esmx/router-react';
import { Router } from '@esmx/router';
import { HomePage as ReactHome } from 'ssr-react/pages/HomePage.js';
import { HomePage as Vue2Home } from 'ssr-vue2/pages/HomePage.js';
import { HomePage as Vue3Home } from 'ssr-vue3/pages/HomePage.js';

export const useUniversalRouter = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.addRoute('/', { component: () => React.createElement('div', { className: 'text-center p-8' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'ESMX Super App'),
      React.createElement('p', { className: 'text-gray-600' }, 'Select a micro-app from navigation above')
    )});
    router.addRoute('/react', { component: ReactHome });
    router.addRoute('/react/about', { component: () => import('ssr-react/pages/AboutPage.js') });
    router.addRoute('/react/contact', { component: () => import('ssr-react/pages/ContactPage.js') });
    router.addRoute('/vue2', { component: Vue2Home });
    router.addRoute('/vue2/products', { component: () => import('ssr-vue2/pages/ProductsPage.js') });
    router.addRoute('/vue2/dashboard', { component: () => import('ssr-vue2/pages/DashboardPage.js') });
    router.addRoute('/vue3', { component: Vue3Home });
    router.addRoute('/vue3/services', { component: () => import('ssr-vue3/pages/ServicesPage.js') });
    router.addRoute('/vue3/settings', { component: () => import('ssr-vue3/pages/SettingsPage.js') });
  }, [router]);
  
  return router;
};

export function MainLayout() {
  const [activeApp, setActiveApp] = useState('');

  useEffect(() => {
    const unsubscribe = router.onRouteChange((route) => {
      const path = window.location.pathname;
      if (path.startsWith('/react')) setActiveApp('react');
      else if (path.startsWith('/vue2')) setActiveApp('vue2');
      else if (path.startsWith('/vue3')) setActiveApp('vue3');
      else setActiveApp('');
    });
    
    return unsubscribe;
  }, []);

  const navItemClass = (app: string) => `
    font-medium transition-colors duration-200
    ${activeApp === app ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}
    rounded-lg px-4 py-2
  `;

  return React.createElement(RouterProvider, null,
    React.createElement('div', { className: 'min-h-screen bg-gray-50' },
      React.createElement('header', { className: 'bg-white shadow-sm border-b border-gray-200' },
        React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4' },
          React.createElement('div', { className: 'flex items-center justify-between' },
            React.createElement('h1', { className: 'text-2xl font-bold text-gray-900' }, 'ESMX Super App'),
            React.createElement('nav', { className: 'flex space-x-1' },
              React.createElement(RouterLink, { 
                to: '/react', 
                className: navItemClass('react'),
                activeClass: 'active'
              }, 'React App'),
              React.createElement(RouterLink, { 
                to: '/vue2', 
                className: navItemClass('vue2'),
                activeClass: 'active'
              }, 'Vue 2 App'),
              React.createElement(RouterLink, { 
                to: '/vue3', 
                className: navItemClass('vue3'),
                activeClass: 'active'
              }, 'Vue 3 App')
            )
          )
        )
      ),
      React.createElement('main', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
        React.createElement(RouterView, null)
      )
    )
  );
}

export default MainLayout;