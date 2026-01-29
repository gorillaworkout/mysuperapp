import { defineComponent, ref, onMounted } from 'vue';

export const HomePage = defineComponent({
  name: 'Vue3HomePage',
  setup() {
    const title = ref('Vue 3 Micro App');
    
    onMounted(() => {
      console.log('Vue 3 HomePage mounted');
    });
    
    return { title };
  },
  template: `
    <div class="vue3-home">
      <h1>{{ title }}</h1>
      <p>Welcome to Vue 3 Micro-Frontend application!</p>
      <div class="vue3-features">
        <h2>Features:</h2>
        <ul>
          <li>Vue 3 Composition API</li>
          <li>Shared router state</li>
          <li>SSR-compatible</li>
          <li>TypeScript support</li>
          <li>Reactivity System</li>
        </ul>
      </div>
    </div>
  `
});

export async function asyncData() {
  return {
    title: 'Vue 3 Micro App - Server Rendered'
  };
}

export default HomePage;