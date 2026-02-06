// Vue Router Adapter
import Vue, { PluginObject } from 'vue';
import { Router } from '@esmx/router';

export interface RouterVuePlugin extends PluginObject<any> {
  router?: Router;
}

const VueRouterPlugin: RouterVuePlugin = {
  install(vueInstance: typeof Vue, options?: any) {
    const router =
      options?.router ||
      (typeof (Router as any).getInstance === 'function'
        ? (Router as any).getInstance()
        : null);
    if (!router) {
      console.warn('[esmx-router-vue2] Router instance not provided.');
      return;
    }
    this.router = router;

    vueInstance.prototype.$router = router;
    
    vueInstance.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this._routerRoot = this;
          this._router = router;
          
          try {
            this._route = router.route;
          } catch (e) { }

          const unsubscribe = router.afterEach((route) => {
            this._route = route;
            this.$forceUpdate();
          });
          
          this.$once('hook:destroyed', unsubscribe);
        } else {
          this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
        }
      },
      destroyed() {
        if (this._routerRoot === this) {
          this._routerRoot = null;
        }
      }
    });

    Object.defineProperty(vueInstance.prototype, '$route', {
      get() { return this._routerRoot._route || {}; }
    });

    vueInstance.component('router-link', {
      props: {
        to: { type: [String, Object], required: true },
        replace: { type: Boolean, default: false },
        activeClass: { type: String, default: 'active' },
        tag: { type: String, default: 'a' }
      },
      render(h) {
        const path = typeof this.to === 'string' ? this.to : this.to.path;
        const isActive = this.$router && path === window.location.pathname;
        
        const classes = [];
        if (this.$vnode.data && this.$vnode.data.staticClass) {
          classes.push(this.$vnode.data.staticClass);
        }
        if (isActive && this.activeClass) {
          classes.push(this.activeClass);
        }

        const data = {
          class: classes,
          on: {
            click: (e: Event) => {
              e.preventDefault();
              this.$router.push(path, this.replace);
            }
          },
          attrs: { href: path }
        };

        return h(this.tag, data, this.$slots.default);
      }
    });

    vueInstance.component('router-view', {
      functional: true,
      render(h, { parent }): any {
        let route = parent.$route;
        if (!route) {
          try {
            route = router.route;
          } catch (e) { }
        }

        const matched = route?.matched;
        const component = matched && matched.length > 0
          ? matched[matched.length - 1].component
          : null;

        if (!component) {
          return null;
        }
        
        return h(component);
      }
    });
  }
};

export function install(vueInstance: typeof Vue, options?: any) {
  vueInstance.use(VueRouterPlugin, options);
}

export function RouterView(Vue) {
  return Vue.component('router-view', {
    functional: true,
    render(h, { parent }) {
      let route = parent.$route;
      if (!route) {
        try {
          route = (Router as any).getInstance?.()?.route;
        } catch (e) { }
      }
      const matched = route?.matched;
      const component = matched && matched.length > 0
        ? matched[matched.length - 1].component
        : null;
      if (!component) {
        return null;
      }
      return h(component);
    }
  });
}

export function RouterLink(Vue) {
  return Vue.component('router-link', {
    props: {
      to: { type: [String, Object], required: true },
      replace: { type: Boolean, default: false },
      activeClass: { type: String, default: 'active' },
      tag: { type: String, default: 'a' }
    },
    render(h) {
      const router = this.$router || (Router as any).getInstance?.();
      const path = typeof this.to === 'string' ? this.to : this.to.path;
      const isActive = router && path === window.location.pathname;
      
      const classes = [];
      if (isActive && this.activeClass) {
        classes.push(this.activeClass);
      }

      const data = {
        class: classes,
        on: {
          click: (e: Event) => {
            e.preventDefault();
            if (router) {
              router.push(path, this.replace);
            }
          }
        },
        attrs: { href: path }
      };

      return h(this.tag, data, this.$slots.default);
    }
  });
}
