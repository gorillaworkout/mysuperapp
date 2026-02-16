import Vue from 'ssr-npm-vue2';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #ecfdf5, #f0fdfa, #ecfeff)',
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
    color: '#059669',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563'
  },
  badge: {
    marginTop: '1rem',
    display: 'inline-block',
    background: '#fef9c3',
    color: '#854d0e',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  featureBox: {
    background: '#ecfdf5',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #10b981'
  },
  archBox: {
    background: '#f0fdfa',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #14b8a6'
  },
  boxTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
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
  navBox: {
    background: '#fefce8',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem'
  },
  navTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  navDesc: {
    fontSize: '0.875rem',
    color: '#4b5563',
    marginBottom: '1rem'
  },
  buttonContainer: {
    display: 'flex',
    gap: '0.75rem'
  },
  buttonGray: {
    display: 'inline-block',
    background: '#6b7280',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  buttonEmerald: {
    display: 'inline-block',
    background: '#10b981',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  footer: {
    background: 'linear-gradient(to right, #10b981, #0d9488)',
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

export const HomePage = Vue.extend({
  name: 'Vue2HomePage',
  render(h) {
    return h('div', { style: styles.container }, [
      h('div', { style: styles.card }, [
        h('div', { style: styles.header }, [
          h('h1', { style: styles.title }, '🌿 Vue 2.7 Micro App'),
          h('p', { style: styles.subtitle }, 'Built with Vue 2.7 + Options API + TypeScript'),
          h('div', { style: styles.badge }, '⏳ Client-Side Rendering')
        ]),

        h('div', { style: styles.grid }, [
          h('div', { style: styles.featureBox }, [
            h('h3', { style: styles.boxTitle }, '🚀 Features'),
            h('ul', { style: styles.list }, [
              h('li', { style: styles.listItem }, '• Options API'),
              h('li', { style: styles.listItem }, '• TypeScript 5'),
              h('li', { style: styles.listItem }, '• ESMX Federation'),
              h('li', { style: styles.listItem }, '• Client-Side Rendering')
            ])
          ]),
          h('div', { style: styles.archBox }, [
            h('h3', { style: styles.boxTitle }, '🏗️ Architecture'),
            h('ul', { style: styles.list }, [
              h('li', { style: styles.listItem }, '• Hub & Spokes Pattern'),
              h('li', { style: styles.listItem }, '• Micro-Frontend Ready'),
              h('li', { style: styles.listItem }, '• Framework Agnostic'),
              h('li', { style: styles.listItem }, '• Multi-Page Routing')
            ])
          ])
        ]),

        h('div', { style: styles.navBox }, [
          h('h3', { style: styles.navTitle }, '🧭 Multi-Page Navigation'),
          h('p', { style: styles.navDesc }, 'This Vue 2 app has multiple pages with internal routing'),
          h('div', { style: styles.buttonContainer }, [
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
              attrs: { href: '/vue2/about' },
              style: styles.buttonEmerald,
              on: { click: (e: MouseEvent) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                (this as any).$router.push('/vue2/about');
              }}
            }, 'Go to About Page →')
          ])
        ]),

        h('div', { style: styles.footer }, [
          h('h3', { style: styles.footerTitle }, '⚡ Powered by ESMX v3'),
          h('p', { style: styles.footerDesc }, 'Zero-bundler federation • Multi-framework • TypeScript')
        ])
      ])
    ]);
  }
});

export default HomePage;
