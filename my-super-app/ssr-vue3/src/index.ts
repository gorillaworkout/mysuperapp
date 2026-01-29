import { defineComponent } from 'vue';

export const App = defineComponent({
  name: 'App',
  template: '<router-view/>'
});

router.addRoute('/vue3', { component: HomePage });

export default function createApp() {
  return createApp(App);
}
