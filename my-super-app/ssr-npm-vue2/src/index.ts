export * from 'vue';
import Vue from 'vue';
import { Router, RouterMode } from '@esmx/router';
import type { Route, RouteConfig } from '@esmx/router';

export { Vue, Router, RouterMode };
export type { Route, RouteConfig };
export default Vue;

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
