import { defineComponent } from 'vue';

export const HomePage = defineComponent({
  name: 'Vue3AdminDashboard',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <!-- Navigation -->
      <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🛒</span>
              <span class="font-bold text-xl text-gray-900">E-Commerce</span>
            </div>
            <div class="flex gap-4">
              <a href="/" class="text-gray-600 hover:text-gray-900 font-medium">← Dashboard</a>
              <a href="/vue2" class="text-gray-600 hover:text-emerald-600 font-medium">Vue 2</a>
              <a href="/vue3" class="text-gray-600 hover:text-purple-600 font-medium">Vue 3</a>
              <a href="/react" class="text-gray-600 hover:text-blue-600 font-medium">React</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-10"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div class="text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-8">
              <span class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Vue 3 E-Commerce Module
            </div>
            
            <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Build with <span class="text-orange-600">Vue 3</span>
            </h1>
            
            <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Modern e-commerce solution built with Vue 3 Composition API and ESMX micro-frontend architecture.
            </p>
            
            <div class="flex flex-wrap justify-center gap-4">
              <button class="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1">
                Shop Now
              </button>
              <button class="px-8 py-4 bg-white text-orange-600 border-2 border-orange-200 rounded-xl font-semibold hover:border-orange-400 hover:bg-orange-50 transition-all">
                View Catalog
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">E-Commerce Features</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with modern Vue 3 and micro-frontend architecture
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">🛍️</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Product Catalog</h3>
            <p class="text-gray-600 leading-relaxed">
              Browse and search products with advanced filtering and sorting capabilities.
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">🛒</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Shopping Cart</h3>
            <p class="text-gray-600 leading-relaxed">
              Add to cart, manage quantities, and checkout with seamless user experience.
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-4xl">💳</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Secure Payment</h3>
            <p class="text-gray-600 leading-relaxed">
              Multiple payment options with secure transaction processing.
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-gray-400">
            🛒 E-Commerce Module • Built with Vue 3 + ESMX
          </p>
        </div>
      </footer>
    </div>
  `
});

export default HomePage;
