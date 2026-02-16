import Vue from 'ssr-npm-vue2';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0fdf4, #ecfdf5, #f0fdfa)',
    padding: '2rem'
  },
  card: {
    maxWidth: '56rem',
    margin: '0 auto',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    padding: '2rem'
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#16a34a',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563'
  },
  navSection: {
    marginBottom: '2rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '0.5rem'
  },
  navTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.75rem'
  },
  navButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
    alignItems: 'center'
  },
  buttonGray: {
    background: '#6b7280',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  buttonGreen: {
    background: '#16a34a',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  separator: {
    color: '#9ca3af',
    alignSelf: 'center'
  },
  currentPage: {
    color: '#4b5563',
    alignSelf: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  catalogBox: {
    background: '#f0fdf4',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #22c55e'
  },
  inventoryBox: {
    background: '#ecfdf5',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #10b981'
  },
  boxTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  boxDesc: {
    fontSize: '0.875rem',
    color: '#4b5563'
  },
  list: {
    fontSize: '0.875rem',
    color: '#4b5563',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    marginBottom: '0.25rem'
  },
  footer: {
    background: 'linear-gradient(to right, #16a34a, #059669)',
    color: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    textAlign: 'center' as const
  },
  footerTitle: {
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  footerDesc: {
    fontSize: '0.875rem'
  }
};

export const ProductsPage = Vue.extend({
  name: 'Vue2ProductsPage',
  render(h) {
    return h('div', { style: styles.container }, [
      h('div', { style: styles.card }, [
        h('div', { style: styles.header }, [
          h('h1', { style: styles.title }, '📦 Vue 2 Products'),
          h('p', { style: styles.subtitle }, 'Products powered by Vue 2')
        ]),

        h('div', { style: styles.navSection }, [
          h('h3', { style: styles.navTitle }, '🧭 Navigation'),
          h('div', { style: styles.navButtons }, [
            h('a', {
              attrs: { href: '/' },
              style: styles.buttonGray,
              on: { click: (e: MouseEvent) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                (this as any).$router.push('/');
              }}
            }, '← Dashboard'),
            h('a', {
              attrs: { href: '/vue2' },
              style: styles.buttonGreen,
              on: { click: (e: MouseEvent) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                (this as any).$router.push('/vue2');
              }}
            }, '← Home'),
            h('span', { style: styles.separator }, '|'),
            h('span', { style: styles.currentPage }, 'Current: Products Page')
          ])
        ]),

        h('div', { style: styles.grid }, [
          h('div', { style: styles.catalogBox }, [
            h('h3', { style: styles.boxTitle }, '🛍️ Product Catalog'),
            h('ul', { style: styles.list }, [
              h('li', { style: styles.listItem }, '• Widget Pro — $29.99'),
              h('li', { style: styles.listItem }, '• Gadget Max — $49.99'),
              h('li', { style: styles.listItem }, '• Tool Kit Plus — $19.99'),
              h('li', { style: styles.listItem }, '• Starter Pack — $9.99')
            ])
          ]),
          h('div', { style: styles.inventoryBox }, [
            h('h3', { style: styles.boxTitle }, '📋 Inventory'),
            h('ul', { style: styles.list }, [
              h('li', { style: styles.listItem }, '• Total SKUs: 156'),
              h('li', { style: styles.listItem }, '• In Stock: 142'),
              h('li', { style: styles.listItem }, '• Low Stock: 8'),
              h('li', { style: styles.listItem }, '• Out of Stock: 6')
            ])
          ])
        ]),

        h('div', { style: styles.footer }, [
          h('h3', { style: styles.footerTitle }, '🛣️ Route: /vue2/products'),
          h('p', { style: styles.footerDesc }, 'Products page of the Vue 2 micro-frontend')
        ])
      ])
    ]);
  }
});

export default ProductsPage;
