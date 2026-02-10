import { React } from 'ssr-npm-react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './index';

// Skip auto-mount in hub mode - hub will call mount() manually
if (!(window as any).__ESMX_HUB_MODE__) {
  console.log('[React] Client entry loading...');

  const container = document.getElementById('micro-app-mount');
  const isHubContext = container?.hasAttribute('data-hub-mounted');

  console.log('[React] Container found:', !!container, '| Hub context:', isHubContext);

  if (container && !isHubContext) {
    try {
      hydrateRoot(container, React.createElement(App, {}));
      console.log('[React] App hydrated successfully');
    } catch (error) {
      console.log('[React] Hydration failed, using createRoot');
      const root = createRoot(container);
      root.render(React.createElement(App, {}));
    }
  } else if (!container) {
    console.error('[React] Container #micro-app-mount not found');
  } else {
    console.log('[React] Skipping auto-mount (hub will call mount)');
  }
}

export { mount, default } from './index';
