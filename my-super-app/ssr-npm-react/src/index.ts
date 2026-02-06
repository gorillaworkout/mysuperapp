import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouterMode } from '@esmx/router';
import type { Route, RouteConfig } from '@esmx/router';

export { React, ReactDOM, Router, RouterMode };
export type { Route, RouteConfig };

export {
  RouterProvider,
  RouterView,
  RouterLink,
  useRouter,
  useRoute,
  useSharedRouter
} from './router-react/index';

export type { RouterProviderProps, RouterLinkProps } from './router-react/index';
