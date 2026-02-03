import { mount } from './index';

console.log('[Ecommerce] Client entry loading...');

const container = document.getElementById('app');
console.log('[Ecommerce] Container found:', !!container);

if (container) {
  try {
    mount(container);
    console.log('[Ecommerce] App mounted successfully');
  } catch (error) {
    console.error('[Ecommerce] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading E-Commerce app. Check console.</div>';
  }
} else {
  console.error('[Ecommerce] Container #app not found');
}
