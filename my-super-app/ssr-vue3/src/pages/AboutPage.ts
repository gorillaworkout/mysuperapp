import { defineComponent } from 'vue';

export const AboutPage = defineComponent({
  name: 'Vue3AboutPage',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50">
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 opacity-10"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style="animation-delay: 2s;"></div>
        
        <div class="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium mb-6">
            <span>📖</span>
            About Vue 3 App
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Page 2 - <span class="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-violet-600">Multi-Page Demo</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            This is the second page demonstrating internal routing within the Vue 3 micro-frontend.
          </p>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">🧭 Internal Navigation</h2>
          <div class="flex gap-4">
            <a href="/vue3" class="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
              ← Back to Home
            </a>
            <span class="self-center text-gray-400">|</span>
            <span class="self-center text-gray-600">Current: About Page</span>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-fuchsia-50 rounded-2xl p-8 shadow-lg border-l-4 border-fuchsia-500">
            <h3 class="text-xl font-bold text-gray-900 mb-3">🎯 Multi-Page Demo</h3>
            <p class="text-gray-600 leading-relaxed">
              This demonstrates internal routing within the Vue 3 micro-app. Each app can have multiple pages while being managed by the Hub.
            </p>
          </div>
          
          <div class="bg-purple-50 rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
            <h3 class="text-xl font-bold text-gray-900 mb-3">🔄 Routing Structure</h3>
            <ul class="text-gray-600 space-y-2">
              <li>• /vue3 → Home Page</li>
              <li>• /vue3/about → About Page</li>
              <li>• Hub manages app switching</li>
              <li>• App manages internal pages</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-2xl p-8 text-center text-white">
          <h3 class="text-2xl font-bold mb-2">🛣️ Route: /vue3/about</h3>
          <p>This is the second page of the Vue 3 micro-frontend</p>
        </div>
      </div>

      <div class="bg-gray-900 text-white py-8">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-400">
            💜 Vue 3.3 Micro-App • Page 2 • Built with ESMX Federation
          </p>
        </div>
      </div>
    </div>
  `
});

export default AboutPage;
