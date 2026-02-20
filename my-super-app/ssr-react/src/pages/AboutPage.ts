import React from 'react';
import { NavLink } from '../components/NavLink';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3)',
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
    color: '#9333ea',
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
  buttonBlue: {
    background: '#3b82f6',
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
  purpleBox: {
    background: '#faf5ff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #a855f7'
  },
  pinkBox: {
    background: '#fdf2f8',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #ec4899'
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
    background: 'linear-gradient(to right, #a855f7, #ec4899)',
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

export const AboutPage = () => {
  return React.createElement('div', { className: 'react-about', style: styles.container },
    React.createElement('div', { style: styles.card },
      React.createElement('div', { style: styles.header },
        React.createElement('h1', { style: styles.title }, '📖 About React App - gorillaworkout'),
        React.createElement('p', { style: styles.subtitle }, 'Page 2 - Multi-page routing demo')
      ),

      React.createElement('div', { style: styles.navSection },
        React.createElement('h3', { style: styles.navTitle }, '🧭 Navigation'),
        React.createElement('div', { style: styles.navButtons },
          React.createElement(NavLink, {
            to: '/',
            style: styles.buttonGray
          }, '← Back to Dashboard'),
          React.createElement(NavLink, {
            to: '/react',
            style: styles.buttonBlue
          }, '← Home'),
          React.createElement('span', { style: styles.separator }, '|'),
          React.createElement('span', { style: styles.currentPage }, 'Current: About Page')
        )
      ),

      React.createElement('div', { style: styles.grid },
        React.createElement('div', { style: styles.purpleBox },
          React.createElement('h3', { style: styles.boxTitle }, '🎯 Multi-Page Demo'),
          React.createElement('p', { style: styles.boxDesc },
            'This demonstrates internal routing within the React micro-app. Each app can have multiple pages while being managed by the Hub.'
          )
        ),
        React.createElement('div', { style: styles.pinkBox },
          React.createElement('h3', { style: styles.boxTitle }, '🔄 Routing Structure'),
          React.createElement('ul', { style: styles.list },
            React.createElement('li', { style: styles.listItem }, '• /react → Home Page'),
            React.createElement('li', { style: styles.listItem }, '• /react/about → About Page'),
            React.createElement('li', { style: styles.listItem }, '• Hub manages app switching'),
            React.createElement('li', { style: styles.listItem }, '• App manages internal pages')
          )
        )
      ),

      React.createElement('div', { style: styles.footer },
        React.createElement('h3', { style: styles.footerTitle }, '🛣️ Route: /react/about'),
        React.createElement('p', { style: styles.footerDesc }, 'This is the second page of the React micro-frontend')
      )
    )
  );
};

export default AboutPage;
