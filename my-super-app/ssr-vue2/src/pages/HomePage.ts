import Vue from 'vue';

export const HomePage = Vue.extend({
  name: 'Vue2HomePage',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-10"></div>
        <div class="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Vue 2.7 Micro-Frontend
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Modern Apps with <span class="text-emerald-600">Vue 2.7</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Experience the power of Options API with ESMX Federation. 
            Seamlessly integrated micro-frontend architecture.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button class="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started
            </button>
            <button class="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Vue 2.7?</h2>
          <p class="text-gray-600 max-w-xl mx-auto">Perfect balance of simplicity and power for your micro-frontend needs</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">🌿</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Options API</h3>
            <p class="text-gray-600 leading-relaxed">
              Familiar and intuitive API pattern that makes development straightforward and maintainable.
            </p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div class="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">⚡</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p class="text-gray-600 leading-relaxed">
              Optimized reactivity system ensures your app runs smoothly with minimal overhead.
            </p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div class="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-3xl">🔗</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">ESMX Ready</h3>
            <p class="text-gray-600 leading-relaxed">
              Built for micro-frontend architecture with seamless module federation support.
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div class="text-4xl font-bold mb-2">2.7</div>
              <div class="text-emerald-100">Vue Version</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">100%</div>
              <div class="text-emerald-100">TypeScript</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">ESM</div>
              <div class="text-emerald-100">Native Modules</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">SSR</div>
              <div class="text-emerald-100">Ready</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <span class="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">Vue 2.7</span>
            <span class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">Options API</span>
            <span class="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">TypeScript</span>
            <span class="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium">ESMX</span>
            <span class="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg font-medium">Rspack</span>
            <span class="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg font-medium">Tailwind</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-900 text-white py-8">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-400">
            🌿 Vue 2.7 Micro-App • Built with ESMX Federation • Part of ESMX Super App
          </p>
        </div>
      </div>
    </div>
  `
});

export default HomePage;
