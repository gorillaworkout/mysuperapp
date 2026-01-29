import Vue from 'vue';

export const App = Vue.extend({
  template: '<router-view/>'
});

router.addRoute('/vue2', { component: HomePage });

export default function createApp() {
  return new Vue({ render: h => h(App) });
}
