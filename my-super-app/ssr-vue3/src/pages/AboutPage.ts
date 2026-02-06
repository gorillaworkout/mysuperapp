import { defineComponent, h, resolveComponent } from 'ssr-npm-vue3';

export const AboutPage = defineComponent({
  name: 'Vue3AboutPage',
  render() {
    return h('div', { 
      class: 'min-h-screen bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 p-8' 
    }, [
      h('div', { class: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8' }, [
        h('div', { class: 'text-center mb-8' }, [
          h('h1', { class: 'text-4xl font-bold text-fuchsia-600 mb-2' }, '📖 About Vue 3.3 App'),
          h('p', { class: 'text-lg text-gray-600' }, 'Page 2 - Multi-page routing demo')
        ]),

        h('div', { class: 'mb-8 p-4 bg-gray-50 rounded-lg' }, [
          h('h3', { class: 'font-semibold text-gray-800 mb-3' }, '🧭 Navigation'),
          h('div', { class: 'flex gap-4 flex-wrap' }, [
            h(resolveComponent('router-link'), { 
              to: '/',
              class: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
            }, () => '← Dashboard'),
            h(resolveComponent('router-link'), { 
              to: '/vue3',
              class: 'bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition'
            }, () => '← Home'),
            h('span', { class: 'text-gray-400 self-center' }, '|'),
            h('span', { class: 'text-gray-600 self-center' }, 'Current: About Page')
          ])
        ]),

        h('div', { class: 'grid md:grid-cols-2 gap-6 mb-8' }, [
          h('div', { class: 'bg-fuchsia-50 p-6 rounded-lg border-l-4 border-fuchsia-500' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🎯 Multi-Page Demo'),
            h('p', { class: 'text-sm text-gray-600' }, 
              'This demonstrates internal routing within the Vue 3 micro-app. Each app can have multiple pages while being managed by the Hub.'
            )
          ]),
          h('div', { class: 'bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🔄 Routing Structure'),
            h('ul', { class: 'text-sm text-gray-600 space-y-1' }, [
              h('li', '• /vue3 → Home Page'),
              h('li', '• /vue3/about → About Page'),
              h('li', '• Hub manages app switching'),
              h('li', '• App manages internal pages')
            ])
          ])
        ]),

        h('div', { class: 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white p-6 rounded-lg text-center' }, [
          h('h3', { class: 'font-semibold mb-2' }, '🛣️ Route: /vue3/about'),
          h('p', { class: 'text-sm' }, 'This is the second page of the Vue 3 micro-frontend')
        ])
      ])
    ]);
  }
});

export default AboutPage;
