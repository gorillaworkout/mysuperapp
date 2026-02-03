import React from 'react';

export const HomePage = () => {
  return React.createElement('div', { className: 'react-home min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8' },
    React.createElement('div', { className: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8' },
      // Header
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-4xl font-bold text-indigo-600 mb-2' }, '🔥 React Micro App'),
        React.createElement('p', { className: 'text-lg text-gray-600' }, 'Built with React 18 + SSR + TypeScript'),
        React.createElement('div', { className: 'mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium' },
          '✅ Server-Side Rendering Active'
        )
      ),

      // Features Grid
      React.createElement('div', { className: 'grid md:grid-cols-2 gap-6 mb-8' },
        React.createElement('div', { className: 'bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500' },
          React.createElement('h3', { className: 'font-semibold text-gray-800 mb-2' }, '🚀 Features'),
          React.createElement('ul', { className: 'text-sm text-gray-600 space-y-1' },
            React.createElement('li', null, '• React 18 Hooks'),
            React.createElement('li', null, '• TypeScript 5'),
            React.createElement('li', null, '• SSR with Hydration'),
            React.createElement('li', null, '• ESMX Federation')
          )
        ),
        React.createElement('div', { className: 'bg-green-50 p-6 rounded-lg border-l-4 border-green-500' },
          React.createElement('h3', { className: 'font-semibold text-gray-800 mb-2' }, '🏗️ Architecture'),
          React.createElement('ul', { className: 'text-sm text-gray-600 space-y-1' },
            React.createElement('li', null, '• Hub & Spokes Pattern'),
            React.createElement('li', null, '• DIAMOND Providers'),
            React.createElement('li', null, '• Universal Router'),
            React.createElement('li', null, '• Framework Agnostic')
          )
        )
      ),

      React.createElement('div', { className: 'bg-yellow-50 p-6 rounded-lg mb-6' },
        React.createElement('h3', { className: 'font-semibold text-gray-800 mb-2' }, '🔄 Navigation Demo'),
        React.createElement('p', { className: 'text-sm text-gray-600 mb-4' }, 'This page is routed via Universal Router from ssr-hub!'),
        React.createElement('div', { className: 'flex flex-wrap gap-3 mb-4' },
          React.createElement('span', { className: 'bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm' }, '/react → React App'),
          React.createElement('span', { className: 'bg-green-100 text-green-800 px-3 py-1 rounded text-sm' }, '/vue2 → Vue 2 App'),
          React.createElement('span', { className: 'bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm' }, '/vue3 → Vue 3 App')
        ),
        React.createElement('div', { className: 'mt-4' },
          React.createElement('a', { 
            href: '/react/about',
            className: 'inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition'
          }, 'Go to About Page →')
        )
      ),

      // Tech Stack
      React.createElement('div', { className: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg text-center' },
        React.createElement('h3', { className: 'font-semibold mb-2' }, '⚡ Powered by ESMX v3'),
        React.createElement('p', { className: 'text-sm' }, 'Zero-bundler federation • Multi-framework • TypeScript'),
        React.createElement('div', { className: 'mt-4 flex justify-center gap-4 text-xs' },
          React.createElement('span', { className: 'bg-white bg-opacity-20 px-3 py-1 rounded' }, 'React 18'),
          React.createElement('span', { className: 'bg-white bg-opacity-20 px-3 py-1 rounded' }, 'TypeScript'),
          React.createElement('span', { className: 'bg-white bg-opacity-20 px-3 py-1 rounded' }, 'SSR/SSG'),
          React.createElement('span', { className: 'bg-white bg-opacity-20 px-3 py-1 rounded' }, 'ESMx')
        )
      )
    )
  );
};

export default HomePage;
