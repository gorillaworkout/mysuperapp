export * from 'vue';
import { Router, RouterMode } from '@esmx/router';
import type { Route, RouteConfig } from '@esmx/router';

export { Router, RouterMode };
export type { Route, RouteConfig };

export {
  RouterPlugin,
  RouterLink,
  RouterView,
  getRoute,
  getRouter,
  getRouterViewDepth,
  useLink,
  useProvideRouter,
  useRoute,
  useRouter,
  useRouterViewDepth
} from '@esmx/router-vue';
