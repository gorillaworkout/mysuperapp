import Vue from 'ssr-npm-vue2';

export const HomePage = Vue.extend({
  name: 'Vue2HomePage',
  render(h) {
    return h('div', { 
      class: 'min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8' 
    }, [
      h('div', { class: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8' }, [
        h('div', { class: 'text-center mb-8' }, [
          h('h1', { class: 'text-4xl font-bold text-emerald-600 mb-2' }, '🌿 Vue 2.7 Micro App'),
          h('p', { class: 'text-lg text-gray-600' }, 'Built with Vue 2.7 + Options API + TypeScript'),
          h('div', { class: 'mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium' }, 
            '⏳ Client-Side Rendering')
        ]),

        h('div', { class: 'grid md:grid-cols-2 gap-6 mb-8' }, [
          h('div', { class: 'bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🚀 Features'),
            h('ul', { class: 'text-sm text-gray-600 space-y-1' }, [
              h('li', '• Options API'),
              h('li', '• TypeScript 5'),
              h('li', '• ESMX Federation'),
              h('li', '• Client-Side Rendering')
            ])
          ]),
          h('div', { class: 'bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🏗️ Architecture'),
            h('ul', { class: 'text-sm text-gray-600 space-y-1' }, [
              h('li', '• Hub & Spokes Pattern'),
              h('li', '• Micro-Frontend Ready'),
              h('li', '• Framework Agnostic'),
              h('li', '• Multi-Page Routing')
            ])
          ])
        ]),

        h('div', { class: 'bg-yellow-50 p-6 rounded-lg mb-6' }, [
          h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🧭 Multi-Page Navigation'),
          h('p', { class: 'text-sm text-gray-600 mb-4' }, 'This Vue 2 app has multiple pages with internal routing'),
          h('div', { class: 'flex gap-3' }, [
            h('router-link', { 
              props: { to: '/' },
              staticClass: 'inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
            }, '← Dashboard'),
            h('router-link', {
              props: { to: '/vue2/about' },
              staticClass: 'inline-block bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition'
            }, 'Go to About Page →')
          ])
        ]),

        h('div', { class: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg text-center' }, [
          h('h3', { class: 'font-semibold mb-2' }, '⚡ Powered by ESMX v3'),
          h('p', { class: 'text-sm' }, 'Zero-bundler federation • Multi-framework • TypeScript')
        ])
      ])
    ]);
  }
});

export default HomePage;
