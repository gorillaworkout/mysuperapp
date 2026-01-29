import type { App, Plugin } from 'vue';
import { Router } from '@esmx/router';

export const RouterVuePlugin: Plugin = {
  install(app: App, options?: any) {
    const router = Router.getInstance();
    
    app.config.globalProperties.$router = router;
    app.provide('router', router);

    let currentRoute = router.getCurrentRoute();
    const routeRef = { value: currentRoute };
    
    app.provide('route', routeRef);

    const unsubscribe = router.onRouteChange((route) => {
      routeRef.value = route;
      app.config.globalProperties.$forceUpdate?.();
    });

    app.mixin({
      beforeUnmount() {
        if (this.$.type.name === 'App') {
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
        <a :href="path" @click.prevent="handleClick" :class="classes">
          <slot></slot>
        </a>
      `,
      setup(props) {
        const router = Router.getInstance();
        
        const path = typeof props.to === 'string' ? props.to : props.to.path;
        const routeRef = inject('route');
        const isActive = path === window.location.pathname;
        
        const classes = computed(() => {
          const result = [];
          if (isActive && props.activeClass) {
            result.push(props.activeClass);
          }
          return result;
        });

        const handleClick = () => {
          router.push(path, props.replace);
        };

        return { path, classes, handleClick };
      }
    });

    app.component('router-view', {
      template: `<component v-if="Component" :is="Component" />`,
      setup() {
        const routeRef = inject('route') as Ref<any>;
        
        return {
          Component: computed(() => routeRef.value?.component || null)
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
    throw new Error('useRouter must be used within RouterProvider');
  }
  return router;
}

export function useRoute() {
  const route = inject<Ref<any>>('route');
  if (!route) {
    throw new Error('useRoute must be used within RouterProvider');
  }
  return route;
}