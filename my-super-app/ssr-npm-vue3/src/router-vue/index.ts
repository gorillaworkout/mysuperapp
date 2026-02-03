import { App, Plugin, inject, computed, Ref, ref, shallowRef } from 'vue';
import { Router } from '@esmx/router';

export const RouterVuePlugin: Plugin = {
  install(app: App, options: { router: Router }) {
    const router = options?.router;

    if (!router) {
      console.warn('RouterVuePlugin installed without router instance.');
      return;
    }

    app.config.globalProperties.$router = router;
    app.provide('router', router);

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
        <a :href="url" @click.prevent="handleClick" :class="classes">
          <slot></slot>
        </a>
      `,
      setup(props) {
        const router = inject<Router>('router')!;
        const routeRef = inject<Ref<any>>('route')!;

        const path = computed(() => typeof props.to === 'string' ? props.to : props.to.path);

        // Use router.resolve if available to get full URL, simplified here
        const url = path;

        const isActive = computed(() => {
          return routeRef.value?.path === path.value;
        });

        const classes = computed(() => {
          const result = [];
          if (isActive.value && props.activeClass) {
            result.push(props.activeClass);
          }
          return result;
        });

        const handleClick = () => {
          if (props.replace) {
            router.replace(path.value);
          } else {
            router.push(path.value);
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