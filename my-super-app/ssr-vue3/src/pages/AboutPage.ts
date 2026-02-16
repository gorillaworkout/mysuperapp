import { defineComponent, h, resolveComponent } from 'ssr-npm-vue3';
import { useRouter } from 'ssr-npm-vue3';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #fdf4ff, #faf5ff, #f5f3ff)',
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
    color: '#c026d3',
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
  buttonPurple: {
    background: '#a855f7',
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
  fuchsiaBox: {
    background: '#fdf4ff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #d946ef'
  },
  purpleBox: {
    background: '#faf5ff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #a855f7'
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
    background: 'linear-gradient(to right, #d946ef, #9333ea)',
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

export const AboutPage = defineComponent({
  name: 'Vue3AboutPage',
  setup() {
    const router = useRouter();
    const navLink = (to: string, style: any, label: string) => {
      return h('a', {
        href: to,
        style,
        onClick: (e: Event) => {
          const me = e as MouseEvent;
          if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
          e.preventDefault();
          router.push(to);
        }
      }, label);
    };
    return { navLink };
  },
  render() {
    return h('div', { style: styles.container }, [
      h('div', { style: styles.card }, [
        h('div', { style: styles.header }, [
          h('h1', { style: styles.title }, '📖 About Vue 3.3 App'),
          h('p', { style: styles.subtitle }, 'Page 2 - Multi-page routing demo')
        ]),

        h('div', { style: styles.navSection }, [
          h('h3', { style: styles.navTitle }, '🧭 Navigation'),
          h('div', { style: styles.navButtons }, [
            this.navLink('/', styles.buttonGray, '← Dashboard'),
            this.navLink('/vue3', styles.buttonPurple, '← Home'),
            h('span', { style: styles.separator }, '|'),
            h('span', { style: styles.currentPage }, 'Current: About Page')
          ])
        ]),

        h('div', { style: styles.grid }, [
          h('div', { style: styles.fuchsiaBox }, [
            h('h3', { style: styles.boxTitle }, '🎯 Multi-Page Demo'),
            h('p', { style: styles.boxDesc }, 
              'This demonstrates internal routing within the Vue 3 micro-app. Each app can have multiple pages while being managed by the Hub.'
            )
          ]),
          h('div', { style: styles.purpleBox }, [
            h('h3', { style: styles.boxTitle }, '🔄 Routing Structure'),
            h('ul', { style: styles.list }, [
              h('li', { style: styles.listItem }, '• /vue3 → Home Page'),
              h('li', { style: styles.listItem }, '• /vue3/about → About Page'),
              h('li', { style: styles.listItem }, '• Hub manages app switching'),
              h('li', { style: styles.listItem }, '• App manages internal pages')
            ])
          ])
        ]),

        h('div', { style: styles.footer }, [
          h('h3', { style: styles.footerTitle }, '🛣️ Route: /vue3/about'),
          h('p', { style: styles.footerDesc }, 'This is the second page of the Vue 3 micro-frontend')
        ])
      ])
    ]);
  }
});

export default AboutPage;
