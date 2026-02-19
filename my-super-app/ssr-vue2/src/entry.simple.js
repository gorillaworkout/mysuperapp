// Vue 2 Micro-App - Direct browser globals approach
// No ES module imports that cause "default export" errors

(function() {
  'use strict';
  
  const Vue = window.Vue;
  
  if (!Vue) {
    console.error('[Vue2] Vue not loaded globally');
    return;
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/vue2/about' || path.startsWith('/vue2/about/')) {
      return 'about';
    }
    return 'home';
  }

  function navigateTo(path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  const HomePage = {
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
          h('div', { class: 'bg-yellow-50 p-6 rounded-lg mb-6' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-2' }, '🧭 Multi-Page Navigation'),
            h('div', { class: 'flex gap-3' }, [
              h('button', {
                on: { click: () => navigateTo('/') },
                class: 'inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
              }, '← Dashboard'),
              h('button', {
                on: { click: () => navigateTo('/vue2/about') },
                class: 'inline-block bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition'
              }, 'Go to About Page →')
            ])
          ]),
          h('div', { class: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg text-center' }, [
            h('h3', { class: 'font-semibold mb-2' }, '⚡ Powered by ESMX v3')
          ])
        ])
      ]);
    }
  };

  const AboutPage = {
    name: 'Vue2AboutPage',
    render(h) {
      return h('div', { 
        class: 'min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-8' 
      }, [
        h('div', { class: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8' }, [
          h('div', { class: 'text-center mb-8' }, [
            h('h1', { class: 'text-4xl font-bold text-teal-600 mb-2' }, '📖 About Vue 2.7 App')
          ]),
          h('div', { class: 'mb-8 p-4 bg-gray-50 rounded-lg' }, [
            h('h3', { class: 'font-semibold text-gray-800 mb-3' }, '🧭 Navigation'),
            h('div', { class: 'flex gap-4 flex-wrap' }, [
              h('button', {
                on: { click: () => navigateTo('/') },
                class: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
              }, '← Dashboard'),
              h('button', {
                on: { click: () => navigateTo('/vue2') },
                class: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
              }, '← Home')
            ])
          ]),
          h('div', { class: 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-lg text-center' }, [
            h('h3', { class: 'font-semibold mb-2' }, '🛣️ Route: /vue2/about')
          ])
        ])
      ]);
    }
  };

  function mount(container) {
    console.log('[Vue2] Mounting...');
    
    container.innerHTML = '';
    
    const App = {
      name: 'Vue2App',
      data() {
        return {
          currentPage: getCurrentPage()
        };
      },
      created() {
        window.addEventListener('popstate', () => {
          this.currentPage = getCurrentPage();
        });
      },
      render(h) {
        return this.currentPage === 'about' ? h(AboutPage) : h(HomePage);
      }
    };

    const vm = new Vue({
      el: container,
      render: h => h(App)
    });

    console.log('[Vue2] Mounted successfully');

    return {
      unmount: () => {
        vm.$destroy();
        container.innerHTML = '';
      }
    };
  }

  window.Vue2App = { mount };
})();
