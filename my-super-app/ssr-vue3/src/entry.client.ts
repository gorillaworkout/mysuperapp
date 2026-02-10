import { mount } from './index';

if (!(window as any).__ESMX_HUB_MODE__) {
  console.log('[Vue3] Client entry loading...');

  const container = document.getElementById('micro-app-mount');
  const isHubContext = container?.hasAttribute('data-hub-mounted');

  console.log('[Vue3] Container found:', !!container, '| Hub context:', isHubContext);

  if (container && !isHubContext) {
    try {
      mount(container);
      console.log('[Vue3] App mounted successfully');
    } catch (error) {
      console.error('[Vue3] Mount error:', error);
      container.innerHTML = '<div style="padding: 20px; color: red;">Error loading Vue 3 app. Check console.</div>';
    }
  } else if (!container) {
    console.error('[Vue3] Container #micro-app-mount not found');
  } else {
    console.log('[Vue3] Skipping auto-mount (hub will call mount)');
  }
}

export { mount, default } from './index';
