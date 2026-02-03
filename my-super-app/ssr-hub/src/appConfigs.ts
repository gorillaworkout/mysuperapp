import type { MicroAppConfig } from './hub/types';

export const microAppConfigs: MicroAppConfig[] = [
  {
    name: 'react',
    title: 'React SSR',
    path: '/react',
    icon: '🔥',
    description: 'React 18 + TypeScript',
    color: 'blue',
    framework: 'react',
    ssr: true,
    serverEntry: './dist/server/src/entry.server.mjs',
    clientEntry: './dist/client/src/hydrate.mjs',
    loader: () => import('ssr-react')
  },
  {
    name: 'vue2',
    title: 'Vue 2.7',
    path: '/vue2',
    icon: '🌿',
    description: 'Options API',
    color: 'emerald',
    framework: 'vue2',
    ssr: false,
    loader: () => import('ssr-vue2')
  },
  {
    name: 'vue3',
    title: 'Vue 3.3',
    path: '/vue3',
    icon: '💜',
    description: 'Composition API',
    color: 'purple',
    framework: 'vue3',
    ssr: false,
    loader: () => import('ssr-vue3')
  },
  {
    name: 'ecommerce',
    title: 'E-Commerce',
    path: '/ecommerce',
    icon: '🛒',
    description: 'Vue 3 Store',
    color: 'orange',
    framework: 'vue3',
    ssr: false,
    loader: () => import('ssr-vue3-ecommerce')
  },
  {
    name: 'admin',
    title: 'Admin',
    path: '/admin',
    icon: '⚙️',
    description: 'Vue 3 Admin',
    color: 'gray',
    framework: 'vue3',
    ssr: false,
    loader: () => import('ssr-vue3-admin')
  }
];
