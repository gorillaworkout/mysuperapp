import React, { useState, useEffect } from 'react';

const colorClasses = {
  blue: 'hover:border-blue-400 hover:shadow-blue-100',
  emerald: 'hover:border-emerald-400 hover:shadow-emerald-100',
  purple: 'hover:border-purple-400 hover:shadow-purple-100',
  orange: 'hover:border-orange-400 hover:shadow-orange-100',
  gray: 'hover:border-gray-400 hover:shadow-gray-100',
  red: 'hover:border-red-400 hover:shadow-red-100',
  yellow: 'hover:border-yellow-400 hover:shadow-yellow-100',
  indigo: 'hover:border-indigo-400 hover:shadow-indigo-100'
};

function Dashboard({ apps }) {
  return React.createElement('div', { className: 'text-center p-8' },
    React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-gray-900' }, 'ESMX Super App Dashboard'),
    React.createElement('p', { className: 'text-gray-600 mb-8' }, 'Select a micro-app to get started'),
    React.createElement('div', { className: 'grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto' },
      ...apps.map(app =>
        React.createElement('a', {
          key: app.name,
          href: app.path,
          onClick: (e) => {
            e.preventDefault();
            window.history.pushState({}, '', app.path);
            window.dispatchEvent(new PopStateEvent('popstate'));
          },
          className: `block p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 hover:shadow-lg ${colorClasses[app.color] || colorClasses.gray} group cursor-pointer`
        },
          React.createElement('div', { className: 'text-4xl mb-3 group-hover:scale-110 transition-transform' }, app.icon),
          React.createElement('h3', { className: 'font-bold text-gray-900 mb-1' }, app.title),
          React.createElement('p', { className: 'text-sm text-gray-500' }, app.description)
        )
      )
    )
  );
}

function MicroAppContainer({ app, hub }) {
  const [mountNode, setMountNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountNode) return;

    let unmountFn = null;

    app.loader()
      .then((module) => {
        setLoading(false);
        
        if (module.mount && typeof module.mount === 'function') {
          const result = module.mount(mountNode);
          if (result && typeof result.unmount === 'function') {
            unmountFn = result.unmount;
          }
        } else if (module.default && typeof module.default === 'function') {
          const result = module.default(mountNode);
          if (result && typeof result.unmount === 'function') {
            unmountFn = result.unmount;
          }
        }
      })
      .catch((err) => {
        console.error(`Failed to load ${app.name}:`, err);
        setError(`Failed to load ${app.title}`);
        setLoading(false);
      });

    return () => {
      if (unmountFn) unmountFn();
    };
  }, [mountNode, app]);

  if (loading) {
    return React.createElement('div', { className: 'flex items-center justify-center h-64' },
      React.createElement('div', { className: 'text-gray-600' }, `Loading ${app.title}...`)
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

export function MainLayout({ hub }) {
  const [currentPath, setCurrentPath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [currentApp, setCurrentApp] = useState(null);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (hub) {
      setApps(hub.getAllApps());
      const state = hub.getState();
      setCurrentPath(state.currentPath);
      setCurrentApp(state.currentApp);
      
      return hub.subscribe((state) => {
        setCurrentPath(state.currentPath);
        setCurrentApp(state.currentApp);
      });
    } else {
      setApps([]);
    }
  }, [hub]);

  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname;
      setCurrentPath(newPath);
      if (hub) {
        const app = hub.getAppByPath(newPath);
        setCurrentApp(app || null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [hub]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (hub) {
      hub.navigateToPath(path);
      const app = hub.getAppByPath(path);
      setCurrentApp(app || null);
    }
  };

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
            ...apps.map(app =>
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
        ? React.createElement(MicroAppContainer, { app: currentApp, hub })
        : React.createElement(Dashboard, { apps })
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
