import React from 'react';
import { RouterLink } from 'ssr-npm-react';

export const AboutPage = () => {
  return React.createElement('div', { className: 'react-about min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8' },
    React.createElement('div', { className: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8' },
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-4xl font-bold text-purple-600 mb-2' }, '📖 About React App'),
        React.createElement('p', { className: 'text-lg text-gray-600' }, 'Page 2 - Multi-page routing demo')
      ),

      React.createElement('div', { className: 'mb-8 p-4 bg-gray-50 rounded-lg' },
        React.createElement('h3', { className: 'font-semibold text-gray-800 mb-3' }, '🧭 Navigation'),
        React.createElement('div', { className: 'flex gap-4 flex-wrap' },
          React.createElement(RouterLink, {
            to: '/',
            className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
          }, '← Back to Dashboard'),
          React.createElement(RouterLink, {
            to: '/react',
            className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          }, '← Home'),
          React.createElement('span', { className: 'text-gray-400 self-center' }, '|'),
          React.createElement('span', { className: 'text-gray-600 self-center' }, 'Current: About Page')
        )
      ),

      React.createElement('div', { className: 'grid md:grid-cols-2 gap-6 mb-8' },
        React.createElement('div', { className: 'bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500' },
          React.createElement('h3', { className: 'font-semibold text-gray-800 mb-2' }, '🎯 Multi-Page Demo'),
          React.createElement('p', { className: 'text-sm text-gray-600' },
            'This demonstrates internal routing within the React micro-app. Each app can have multiple pages while being managed by the Hub.'
          )
        ),
        React.createElement('div', { className: 'bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500' },
          React.createElement('h3', { className: 'font-semibold text-gray-800 mb-2' }, '🔄 Routing Structure'),
          React.createElement('ul', { className: 'text-sm text-gray-600 space-y-1' },
            React.createElement('li', null, '• /react → Home Page'),
            React.createElement('li', null, '• /react/about → About Page'),
            React.createElement('li', null, '• Hub manages app switching'),
            React.createElement('li', null, '• App manages internal pages')
          )
        )
      ),

      React.createElement('div', { className: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg text-center' },
        React.createElement('h3', { className: 'font-semibold mb-2' }, '🛣️ Route: /react/about'),
        React.createElement('p', { className: 'text-sm' }, 'This is the second page of the React micro-frontend')
      )
    )
  );
};

export default AboutPage;
