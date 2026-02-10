import { mount } from './index';

if (!(window as any).__ESMX_HUB_MODE__) {
  console.log('[Ecommerce] Client entry loading...');

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
    console.error('[Ecommerce] Container #micro-app-mount not found');
  } else {
    console.log('[Ecommerce] Skipping auto-mount (hub will call mount)');
  }
}

export { mount, default } from './index';
