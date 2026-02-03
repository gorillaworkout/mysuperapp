import Vue from 'vue';

export const AboutPage = Vue.extend({
  name: 'Vue2AboutPage',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 opacity-10"></div>
        <div class="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            <span>📖</span>
            About Vue 2.7 App
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Page 2 - <span class="text-teal-600">Multi-Page Demo</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            This is the second page demonstrating internal routing within the Vue 2 micro-frontend.
          </p>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">🧭 Internal Navigation</h2>
          <div class="flex gap-4">
            <a href="/vue2" class="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
              ← Back to Home
            </a>
            <span class="self-center text-gray-400">|</span>
            <span class="self-center text-gray-600">Current: About Page</span>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-teal-50 rounded-2xl p-8 shadow-lg border-l-4 border-teal-500">
            <h3 class="text-xl font-bold text-gray-900 mb-3">🎯 Multi-Page Demo</h3>
            <p class="text-gray-600 leading-relaxed">
              This demonstrates internal routing within the Vue 2 micro-app. Each app can have multiple pages while being managed by the Hub.
            </p>
          </div>
          
          <div class="bg-cyan-50 rounded-2xl p-8 shadow-lg border-l-4 border-cyan-500">
            <h3 class="text-xl font-bold text-gray-900 mb-3">🔄 Routing Structure</h3>
            <ul class="text-gray-600 space-y-2">
              <li>• /vue2 → Home Page</li>
              <li>• /vue2/about → About Page</li>
              <li>• Hub manages app switching</li>
              <li>• App manages internal pages</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h3 class="text-2xl font-bold mb-2">🛣️ Route: /vue2/about</h3>
          <p>This is the second page of the Vue 2 micro-frontend</p>
        </div>
      </div>

      <div class="bg-gray-900 text-white py-8">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-400">
            🌿 Vue 2.7 Micro-App • Page 2 • Built with ESMX Federation
          </p>
        </div>
      </div>
    </div>
  `
});

export default AboutPage;
