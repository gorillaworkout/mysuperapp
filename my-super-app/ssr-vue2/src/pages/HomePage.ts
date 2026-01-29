import Vue from 'vue';

export const HomePage = Vue.extend({
  name: 'Vue2HomePage',
  template: `
    <div class="vue2-home">
      <h1>{{ title }}</h1>
      <p>Welcome to Vue 2 Micro-Frontend application!</p>
      <div class="vue2-features">
        <h2>Features:</h2>
        <ul>
          <li>Vue 2.7 with Composition API</li>
          <li>Shared router state</li>
          <li>SSR-compatible</li>
          <li>TypeScript support</li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      title: 'Vue 2 Micro App'
    };
  },
  asyncData() {
    return {
      title: 'Vue 2 Micro App - Server Rendered'
    };
  }
});

export default HomePage;