import Vue from 'vue';

export const DashboardPage = Vue.extend({
  name: 'Vue2DashboardPage',
  template: `
    <div class="vue2-dashboard">
      <h1>Vue 2 Dashboard</h1>
      <p>Analytics dashboard built with Vue 2</p>
      <div class="navigation">
        <router-link to="/vue2" :active-class="'active'" :tag="'a'">
          Back to Home
        </router-link>
      </div>
    </div>
  `
});

export default DashboardPage;