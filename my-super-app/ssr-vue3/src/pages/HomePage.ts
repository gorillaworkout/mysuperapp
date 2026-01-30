import { defineComponent } from 'vue';

export const HomePage = defineComponent({
  name: 'Vue3HomePage',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-10"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style="animation-delay: 2s;"></div>
        
        <div class="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <span class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Vue 3.3 Micro-Frontend
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Next-Gen Apps with <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Vue 3</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Leverage the Composition API for maximum flexibility. 
            Modern reactivity with ESMX micro-frontend architecture.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button class="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1">
              Start Building
            </button>
            <button class="px-8 py-4 bg-white text-purple-600 border-2 border-purple-200 rounded-xl font-semibold hover:border-purple-400 transition-all">
              View Docs
            </button>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Vue 3 Superpowers</h2>
          <p class="text-gray-600 max-w-xl mx-auto">Modern features for building scalable micro-frontends</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-200">
            <div class="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">💜</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Composition API</h3>
            <p class="text-gray-600 leading-relaxed">
              Better logic reuse with composables. More flexible and powerful than ever before.
            </p>
          </div>
          
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-200">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">⚡</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Proxy Reactivity</h3>
            <p class="text-gray-600 leading-relaxed">
              Faster and more efficient reactivity system using JavaScript Proxies.
            </p>
          </div>
          
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-200">
            <div class="w-14 h-14 bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🚀</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Teleport & Suspense</h3>
            <p class="text-gray-600 leading-relaxed">
              Advanced features for complex UIs. Render anywhere, handle async gracefully.
            </p>
          </div>
        </div>
      </div>

      <!-- Code Example Section -->
      <div class="bg-gray-900 py-16">
        <div class="max-w-4xl mx-auto px-6">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">Clean & Modern Syntax</h3>
            <p class="text-gray-400">Script setup with TypeScript</p>
          </div>
          <div class="bg-gray-800 rounded-xl p-6 overflow-x-auto">
            <pre class="text-sm text-gray-300"><code>&lt;script setup lang="ts"&gt;
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-16">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div class="text-4xl font-bold mb-2">3.3</div>
              <div class="text-purple-200">Vue Version</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">30%</div>
              <div class="text-purple-200">Faster</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">50%</div>
              <div class="text-purple-200">Smaller</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">TS</div>
              <div class="text-purple-200">First Class</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Modern Stack</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <span class="px-4 py-2 bg-violet-50 text-violet-700 rounded-lg font-medium">Vue 3.3</span>
            <span class="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">Composition API</span>
            <span class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">TypeScript 5</span>
            <span class="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium">ESMX</span>
            <span class="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg font-medium">Rspack</span>
            <span class="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg font-medium">Tailwind CSS</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-900 text-white py-8">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-400">
            💜 Vue 3.3 Micro-App • Built with ESMX Federation • Part of ESMX Super App
          </p>
        </div>
      </div>
    </div>
  `
});

export default HomePage;
