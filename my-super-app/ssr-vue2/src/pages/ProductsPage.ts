import Vue from 'vue';

export const ProductsPage = Vue.extend({
  name: 'Vue2ProductsPage',
  template: `
    <div class="vue2-products">
      <h1>Vue 2 Products</h1>
      <p>Product catalog powered by Vue 2</p>
      <div class="navigation">
        <router-link to="/vue2" :active-class="'active'" :tag="'a'">
          Back to Home
        </router-link>
      </div>
    </div>
  `
});

export default ProductsPage;