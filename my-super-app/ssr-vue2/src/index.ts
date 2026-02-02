import Vue from 'vue';
import { HomePage } from './pages/HomePage';

export function mount(container: HTMLElement) {
  const vm = new Vue({
    el: container,
    render: h => h(HomePage)
  });
  
  return {
    unmount: () => {
      vm.$destroy();
      if (container) {
        container.innerHTML = '';
      }
    }
  };
}

export default mount;
