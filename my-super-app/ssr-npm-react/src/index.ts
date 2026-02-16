import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouterMode } from '@esmx/router';
import type { Route, RouteConfig } from '@esmx/router';

export { React, ReactDOM, Router, RouterMode };
export type { Route, RouteConfig };

// Re-export all router-react bindings from official package
export {
  RouterContext,
  RouterViewDepthContext,
  useRoute,
  useRouter,
  useRouterViewDepth,
  RouterLink,
  RouterProvider,
  RouterView,
  useLink
} from '@esmx/router-react';

export type {
  RouterContextValue,
  RouterProviderProps,
  RouterViewProps,
  RouterLinkComponentProps
} from '@esmx/router-react';
