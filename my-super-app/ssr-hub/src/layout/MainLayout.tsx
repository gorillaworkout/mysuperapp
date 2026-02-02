import React, { useState, useEffect } from 'react';

const microApps = [
  {
    name: 'react',
    path: '/react',
    icon: '🔥',
    title: 'React SSR',
    description: 'React 18 + TypeScript',
    color: 'blue',
    loader: () => import('ssr-react')
  },
  {
    name: 'vue2',
    path: '/vue2',
    icon: '🌿',
    title: 'Vue 2.7',
    description: 'Options API',
    color: 'emerald',
    loader: () => import('ssr-vue2')
  },
  {
    name: 'vue3',
    path: '/vue3',
    icon: '💜',
    title: 'Vue 3.3',
    description: 'Composition API',
    color: 'purple',
    loader: () => import('ssr-vue3')
  },
  {
    name: 'ecommerce',
    path: '/ecommerce',
    icon: '🛒',
    title: 'E-Commerce',
    description: 'Vue 3 Store',
    color: 'orange',
    loader: () => import('ssr-vue3-ecommerce')
  },
  {
    name: 'admin',
    path: '/admin',
    icon: '⚙️',
    title: 'Admin',
    description: 'Vue 3 Admin',
    color: 'gray',
    loader: () => import('ssr-vue3-admin')
  }
];

function Dashboard() {
  const colorClasses = {
    blue: 'hover:border-blue-400 hover:shadow-blue-100',
    emerald: 'hover:border-emerald-400 hover:shadow-emerald-100',
    purple: 'hover:border-purple-400 hover:shadow-purple-100',
    orange: 'hover:border-orange-400 hover:shadow-orange-100',
    gray: 'hover:border-gray-400 hover:shadow-gray-100'
  };

  return React.createElement('div', { className: 'text-center p-8' },
    React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-gray-900' }, 'ESMX Super App Dashboard'),
    React.createElement('p', { className: 'text-gray-600 mb-8' }, 'Select a micro-app to get started'),
    React.createElement('div', { className: 'grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto' },
      ...microApps.map(app =>
        React.createElement('a', {
          key: app.name,
          href: app.path,
          onClick: (e) => {
            e.preventDefault();
            window.history.pushState({}, '', app.path);
            window.dispatchEvent(new PopStateEvent('popstate'));
          },
          className: `block p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 hover:shadow-lg ${colorClasses[app.color]} group cursor-pointer`
        },
          React.createElement('div', { className: 'text-4xl mb-3 group-hover:scale-110 transition-transform' }, app.icon),
          React.createElement('h3', { className: 'font-bold text-gray-900 mb-1' }, app.title),
          React.createElement('p', { className: 'text-sm text-gray-500' }, app.description)
        )
      )
    )
  );
}

function MicroAppContainer({ appConfig }) {
  const [mountNode, setMountNode] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!mountNode) return;

    let unmount = null;

    appConfig.loader()
      .then(module => {
        setLoading(false);
        
        if (module.default && typeof module.default === 'function') {
          const result = module.default(mountNode);
          if (result && typeof result.unmount === 'function') {
            unmount = result.unmount;
          }
        }
      })
      .catch(err => {
        console.error(`Failed to load ${appConfig.name}:`, err);
        setError(`Failed to load ${appConfig.title}`);
        setLoading(false);
      });

    return () => {
      if (unmount) unmount();
    };
  }, [mountNode, appConfig]);

  if (loading) {
    return React.createElement('div', { className: 'flex items-center justify-center h-64' },
      React.createElement('div', { className: 'text-gray-600' }, `Loading ${appConfig.title}...`)
    );
  }

  if (error) {
    return React.createElement('div', { className: 'flex items-center justify-center h-64' },
      React.createElement('div', { className: 'text-red-600' }, error)
    );
  }

  return React.createElement('div', {
    ref: setMountNode,
    className: 'micro-app-container'
  });
}

export function MainLayout() {
  const [currentPath, setCurrentPath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const currentApp = microApps.find(app => currentPath.startsWith(app.path));
  const isActive = (path) => currentPath.startsWith(path);

  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('header', { className: 'bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'flex items-center justify-between h-16' },
          React.createElement('a', {
            href: '/',
            onClick: (e) => {
              e.preventDefault();
              navigate('/');
            },
            className: 'flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
          },
            React.createElement('span', null, '🚀'),
            'ESMX Super App'
          ),

          React.createElement('nav', { className: 'flex space-x-1' },
            ...microApps.map(app =>
              React.createElement('a', {
                key: app.name,
                href: app.path,
                onClick: (e) => {
                  e.preventDefault();
                  navigate(app.path);
                },
                className: `font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 ${
                  isActive(app.path)
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`
              },
                React.createElement('span', null, app.icon),
                app.title.split(' ')[0]
              )
            )
          )
        )
      )
    ),

    React.createElement('main', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      currentApp
        ? React.createElement(MicroAppContainer, { appConfig: currentApp })
        : React.createElement(Dashboard)
    ),

    React.createElement('footer', { className: 'bg-gray-900 text-white py-8 mt-auto' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'text-center text-gray-400' },
          'Built with ESMX Federation • Hub & Spokes Architecture • Micro-Frontend Ready'
        )
      )
    )
  );
}

export default MainLayout;
