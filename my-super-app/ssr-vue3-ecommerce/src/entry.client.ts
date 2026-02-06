import { mount } from './index';

console.log('[Ecommerce] Client entry loading...');

// Auto-mount only if NOT in hub context (hub calls mount() manually)
// Hub sets data-hub-mounted="true" on the container before loading
const container = document.getElementById('micro-app-mount');
const isHubContext = container?.hasAttribute('data-hub-mounted');

console.log('[Ecommerce] Container found:', !!container, '| Hub context:', isHubContext);

if (container && !isHubContext) {
  try {
    mount(container);
    console.log('[Ecommerce] App mounted successfully');
  } catch (error) {
    console.error('[Ecommerce] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading E-Commerce app. Check console.</div>';
  }
} else if (!container) {
  console.error('[Ecommerce] Container #micro-app-mount not found - retrying in 100ms');
  // Retry after a short delay to allow DOM to update
  setTimeout(() => {
    const retryContainer = document.getElementById('micro-app-mount');
    const retryHubContext = retryContainer?.hasAttribute('data-hub-mounted');
    console.log('[Ecommerce] Retry - Container found:', !!retryContainer, '| Hub context:', retryHubContext);
    if (retryContainer && !retryHubContext) {
      mount(retryContainer);
    }
  }, 100);
} else {
  console.log('[Ecommerce] Skipping auto-mount (hub will call mount)');
}

export { mount, default } from './index';
