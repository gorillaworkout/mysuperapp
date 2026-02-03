import { mount } from './index';

console.log('[Vue3] Client entry loading...');

const container = document.getElementById('app');
console.log('[Vue3] Container found:', !!container);

if (container) {
  try {
    mount(container);
    console.log('[Vue3] App mounted successfully');
  } catch (error) {
    console.error('[Vue3] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading Vue 3 app. Check console.</div>';
  }
} else {
  console.error('[Vue3] Container #app not found');
}
