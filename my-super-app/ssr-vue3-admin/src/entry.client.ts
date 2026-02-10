import { mount } from './index';

if (!(window as any).__ESMX_HUB_MODE__) {
  console.log('[Admin] Client entry loading...');

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
    console.error('[Admin] Container #micro-app-mount not found');
  } else {
    console.log('[Admin] Skipping auto-mount (hub will call mount)');
  }
}

export { mount, default } from './index';
