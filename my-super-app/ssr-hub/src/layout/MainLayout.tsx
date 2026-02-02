import React from 'react';

// Simple static layout - routing handled by spa-navigation.js
export function MainLayout() {
  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('header', { className: 'bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'flex items-center justify-between h-16' },
          React.createElement('a', { 
            href: '/',
            className: 'flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
          }, 
            React.createElement('span', null, '🚀'),
            'ESMX Super App'
          ),
          
          React.createElement('nav', { className: 'flex space-x-1' },
            React.createElement('a', { 
              href: '/react', 
              className: 'font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }, 
              React.createElement('span', null, '🔥'),
              'React'
            ),
            React.createElement('a', { 
              href: '/vue2', 
              className: 'font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }, 
              React.createElement('span', null, '🌿'),
              'Vue 2'
            ),
            React.createElement('a', { 
              href: '/vue3', 
              className: 'font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }, 
              React.createElement('span', null, '💜'),
              'Vue 3'
            ),
            React.createElement('a', { 
              href: '/ecommerce', 
              className: 'font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }, 
              React.createElement('span', null, '🛒'),
              'E-Commerce'
            ),
            React.createElement('a', { 
              href: '/admin', 
              className: 'font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }, 
              React.createElement('span', null, '⚙️'),
              'Admin'
            )
          )
        )
      )
    ),
    
    React.createElement('main', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      React.createElement('div', { className: 'text-center p-8' },
        React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-gray-900' }, 'ESMX Super App Dashboard'),
        React.createElement('p', { className: 'text-gray-600' }, 'Navigation powered by spa-navigation.js')
      )
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
