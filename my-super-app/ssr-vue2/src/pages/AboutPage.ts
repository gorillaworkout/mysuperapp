import Vue from 'vue';

export const AboutPage = Vue.extend({
  name: 'Vue2AboutPage',
  render(h) {
    return h('div', { 
      class: 'min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-8' 
    }, [
      h('div', { class: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8' }, [
        h('div', { class: 'text-center mb-8' }, [
          h('h1', { class: 'text-4xl font-bold text-teal-600 mb-2' }, '📖 About Vue 2.7 App'),
          h('p', { class: 'text-lg text-gray-600' }, 'Page 2 - Multi-page routing demo')
        ]),

        h('div', { class: 'mb-8 p-4 bg-gray-50 rounded-lg' }, [
          h('h3', { class: 'font-semibold text-gray-800 mb-3' }, '🧭 Navigation'),
          h('div', { class: 'flex gap-4 flex-wrap' }, [
            h('a', { 
              attrs: { href: '/' },
              class: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
            }, '← Dashboard'),
            h('a', { 
              attrs: { href: '/vue2' },
              class: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
            }, '← Home'),
            h('span', { class: 'text-gray-400 self-center' }, '|'),
            h('span', { class: 'text-gray-600 self-center' }, 'Current: About Page')
          ])
        ]),

        h('div', { class: 'grid md:grid-cols-2 gap-6 mb-8' }, [
          h('div', { class: 'bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🎯 Multi-Page Demo'),
            h('p', { class: 'text-sm text-gray-600' }, 
              'This demonstrates internal routing within the Vue 2 micro-app. Each app can have multiple pages while being managed by the Hub.'
            )
          ]),
          h('div', { class: 'bg-cyan-50 p-6 rounded-lg border-l-4 border-cyan-500' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🔄 Routing Structure'),
            h('ul', { class: 'text-sm text-gray-600 space-y-1' }, [
              h('li', '• /vue2 → Home Page'),
              h('li', '• /vue2/about → About Page'),
              h('li', '• Hub manages app switching'),
              h('li', '• App manages internal pages')
            ])
          ])
        ]),

        h('div', { class: 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-lg text-center' }, [
          h('h3', { class: 'font-semibold mb-2' }, '🛣️ Route: /vue2/about'),
          h('p', { class: 'text-sm' }, 'This is the second page of the Vue 2 micro-frontend')
        ])
      ])
    ]);
  }
});

export default AboutPage;
