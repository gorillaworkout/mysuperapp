import Vue from 'ssr-npm-vue2';
import { mount } from './index';

console.log('[Vue2] Client entry loading...');
console.log('[Vue2] Vue version:', Vue?.version);

// Auto-mount only if NOT in hub context (hub calls mount() manually)
// Hub sets data-hub-mounted="true" on the container before loading
const container = document.getElementById('micro-app-mount') || document.getElementById('app');
const isHubContext = container?.hasAttribute('data-hub-mounted');

console.log('[Vue2] Container found:', !!container, '| Hub context:', isHubContext);

if (container && !isHubContext) {
  try {
    mount(container);
    console.log('[Vue2] App mounted successfully');
  } catch (error) {
    console.error('[Vue2] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading Vue 2 app. Check console.</div>';
  }
} else if (!container) {
  console.error('[Vue2] Container #micro-app-mount or #app not found');
} else {
  console.log('[Vue2] Skipping auto-mount (hub will call mount)');
}

export { mount, default } from './index';
