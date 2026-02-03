import { mount } from './index';

console.log('[Admin] Client entry loading...');

const container = document.getElementById('app');
console.log('[Admin] Container found:', !!container);

if (container) {
  try {
    mount(container);
    console.log('[Admin] App mounted successfully');
  } catch (error) {
    console.error('[Admin] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading Admin app. Check console.</div>';
  }
} else {
  console.error('[Admin] Container #app not found');
}
