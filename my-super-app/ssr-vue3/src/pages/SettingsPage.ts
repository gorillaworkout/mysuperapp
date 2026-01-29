import { defineComponent } from 'vue';

export const SettingsPage = defineComponent({
  name: 'Vue3SettingsPage',
  template: `
    <div class="vue3-settings">
      <h1>Vue 3 Settings</h1>
      <p>Application settings and configuration</p>
      <div class="navigation">
        <router-link to="/vue3" :activeClass="'active'">
          Back to Home
        </router-link>
      </div>
    </div>
  `
});

export default SettingsPage;