import type { App, Plugin, Ref } from 'vue';
import { inject, computed, shallowRef } from 'vue';
export * from 'vue';
import { Router, RouterMode } from '@esmx/router';
import type { Route, RouteConfig } from '@esmx/router';

export { Router, RouterMode };
export type { Route, RouteConfig };

export const RouterVuePlugin: Plugin = {
  install(app: App, options: { router: Router; sharedRouter?: Router }) {
    const router = options?.router;
    const sharedRouter = options?.sharedRouter;

    if (!router) {
      console.warn('RouterVuePlugin installed without router instance.');
      return;
    }

    app.config.globalProperties.$router = router;
    app.config.globalProperties.$sharedRouter = sharedRouter || null;
    app.provide('router', router);
    app.provide('sharedRouter', sharedRouter || null);

    const routeRef = shallowRef(router.route);

    app.provide('route', routeRef);

    const unsubscribe = router.afterEach((to) => {
      routeRef.value = to;
    });

    app.mixin({
      beforeUnmount() {
        if (this.$options.name === 'App' || this === app._instance?.proxy) {
          unsubscribe();
        }
      }
    });

    app.component('router-link', {
      props: {
        to: { type: [String, Object], required: true },
        replace: { type: Boolean, default: false },
        activeClass: { type: String, default: 'active' }
      },
      template: `
        <a :href="url" @click.prevent.stop="handleClick" :class="classes">
          <slot></slot>
        </a>
      `,
      setup(props: any) {
        const localRouter = inject<Router>('router')!;
        const hubRouter = inject<Router | null>('sharedRouter');
        const routeRef = inject<Ref<any>>('route')!;

        const path = computed(() => typeof props.to === 'string' ? props.to : props.to.path);

        const url = path;

        const isActive = computed(() => {
          return routeRef.value?.path === path.value;
        });

        const classes = computed(() => {
          const result: string[] = [];
          if (isActive.value && props.activeClass) {
            result.push(props.activeClass);
          }
          return result;
        });

        const isLocalRoute = computed(() => {
          const routes = (localRouter as any).routes || [];
          return routes.some((r: any) => 
            path.value === r.path || path.value.startsWith(r.path + '/')
          );
        });

        const handleClick = () => {
          const targetRouter = isLocalRoute.value ? localRouter : (hubRouter || localRouter);
          
          if (props.replace) {
            targetRouter.replace(path.value);
          } else {
            targetRouter.push(path.value);
          }
        };

        return { url, classes, handleClick };
      }
    });

    app.component('router-view', {
      template: `<component v-if="Component" :is="Component" />`,
      setup() {
        const routeRef = inject<Ref<any>>('route');

        const Component = computed(() => {
          if (!routeRef?.value) return null;
          const matched = routeRef.value.matched;
          return matched && matched.length > 0 ? matched[matched.length - 1].component : null;
        });

        return {
          Component
        };
      }
    });
  }
};

export function install(app: App, options?: any) {
  app.use(RouterVuePlugin, options);
}

export function useRouter(): Router {
  const router = inject<Router>('router');
  if (!router) {
    throw new Error('useRouter must be used within RouterProvider (via RouterVuePlugin)');
  }
  return router;
}

export function useRoute() {
  const route = inject<Ref<any>>('route');
  if (!route) {
    throw new Error('useRoute must be used within RouterProvider (via RouterVuePlugin)');
  }
  return route;
}
