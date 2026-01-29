import { defineComponent } from 'vue';

export const ServicesPage = defineComponent({
  name: 'Vue3ServicesPage',
  template: `
    <div class="vue3-services">
      <h1>Vue 3 Services</h1>
      <p>Service offerings powered by Vue 3 technology</p>
      <div class="navigation">
        <router-link to="/vue3" :activeClass="'active'">
          Back to Home
        </router-link>
      </div>
    </div>
  `
});

export default ServicesPage;