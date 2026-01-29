import Vue, { PluginObject } from 'vue';
import { Router } from '@esmx/router';

export interface RouterVuePlugin extends PluginObject<any> {
  router?: Router;
}

const VueRouterPlugin: RouterVuePlugin = {
  install(vueInstance: typeof Vue, options?: any) {
    const router = Router.getInstance();
    this.router = router;

    vueInstance.prototype.$router = router;
    
    vueInstance.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this._routerRoot = this;
          this._router = router;
          
          let currentRoute = router.getCurrentRoute();
          
          if (currentRoute) {
            this._route = currentRoute;
          }
          
          const unsubscribe = router.onRouteChange((route) => {
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
      render(h, { parent }):
      any {
        const route = parent.$route || router.getCurrentRoute();
        
        if (!route || !route.component) {
          return null;
        }
        
        return h(route.component);
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
      const route = parent.$route || Router.getInstance().getCurrentRoute();
      if (!route || !route.component) {
        return null;
      }
      return h(route.component);
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
      const router = this.$router || Router.getInstance();
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