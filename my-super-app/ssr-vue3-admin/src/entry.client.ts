import { mount } from './index';

console.log('[Admin] Client entry loading...');

// Auto-mount only if NOT in hub context (hub calls mount() manually)
// Hub sets data-hub-mounted="true" on the container before loading
const container = document.getElementById('micro-app-mount');
const isHubContext = container?.hasAttribute('data-hub-mounted');

console.log('[Admin] Container found:', !!container, '| Hub context:', isHubContext);

if (container && !isHubContext) {
  try {
    mount(container);
    console.log('[Admin] App mounted successfully');
  } catch (error) {
    console.error('[Admin] Mount error:', error);
    container.innerHTML = '<div style="padding: 20px; color: red;">Error loading Admin app. Check console.</div>';
  }
} else if (!container) {
  console.error('[Admin] Container #micro-app-mount not found - retrying in 100ms');
  // Retry after a short delay to allow DOM to update
  setTimeout(() => {
    const retryContainer = document.getElementById('micro-app-mount');
    const retryHubContext = retryContainer?.hasAttribute('data-hub-mounted');
    console.log('[Admin] Retry - Container found:', !!retryContainer, '| Hub context:', retryHubContext);
    if (retryContainer && !retryHubContext) {
      mount(retryContainer);
    }
  }, 100);
} else {
  console.log('[Admin] Skipping auto-mount (hub will call mount)');
}

export { mount, default } from './index';
