import React from 'react';
import { NavLink } from '../components/NavLink';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
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
    color: '#4f46e5',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563'
  },
  badge: {
    marginTop: '1rem',
    display: 'inline-block',
    background: '#dcfce7',
    color: '#166534',
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
    background: '#eff6ff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #3b82f6'
  },
  archBox: {
    background: '#f0fdf4',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #22c55e'
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
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  tagBlue: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem'
  },
  tagGreen: {
    background: '#dcfce7',
    color: '#166534',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem'
  },
  tagPurple: {
    background: '#f3e8ff',
    color: '#6b21a8',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem'
  },
  buttonContainer: {
    marginTop: '1rem',
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
  buttonIndigo: {
    display: 'inline-block',
    background: '#6366f1',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  footer: {
    background: 'linear-gradient(to right, #6366f1, #9333ea)',
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
  },
  footerTags: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    fontSize: '0.75rem'
  },
  footerTag: {
    background: 'rgba(255,255,255,0.2)',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem'
  }
};

export const HomePage = () => {
  return React.createElement('div', { className: 'react-home', style: styles.container },
    React.createElement('div', { style: styles.card },
      React.createElement('div', { style: styles.header },
        React.createElement('h1', { style: styles.title }, '🔥 React Micro Blog App'),
        React.createElement('p', { style: styles.subtitle }, 'Built with React 18 + SSR + TypeScript'),
        React.createElement('div', { style: styles.badge },
          '✅ Server-Side Rendering Active'
        )
      ),

      React.createElement('div', { style: styles.grid },
        React.createElement('div', { style: styles.featureBox },
          React.createElement('h3', { style: styles.boxTitle }, '🚀 Features'),
          React.createElement('ul', { style: styles.list },
            React.createElement('li', { style: styles.listItem }, '• React 18 Hooks'),
            React.createElement('li', { style: styles.listItem }, '• TypeScript 5'),
            React.createElement('li', { style: styles.listItem }, '• SSR with Hydration'),
            React.createElement('li', { style: styles.listItem }, '• ESMX Federation')
          )
        ),
        React.createElement('div', { style: styles.archBox },
          React.createElement('h3', { style: styles.boxTitle }, '🏗️ Architecture'),
          React.createElement('ul', { style: styles.list },
            React.createElement('li', { style: styles.listItem }, '• Hub & Spokes Pattern'),
            React.createElement('li', { style: styles.listItem }, '• DIAMOND Providers'),
            React.createElement('li', { style: styles.listItem }, '• Universal Router'),
            React.createElement('li', { style: styles.listItem }, '• Framework Agnostic')
          )
        )
      ),

      React.createElement('div', { style: styles.navBox },
        React.createElement('h3', { style: styles.navTitle }, '🔄 Navigation Demo'),
        React.createElement('p', { style: styles.navDesc }, 'This page is routed via Universal Router from ssr-hub!'),
        React.createElement('div', { style: styles.tagContainer },
          React.createElement('span', { style: styles.tagBlue }, '/react → React App'),
          React.createElement('span', { style: styles.tagGreen }, '/vue2 → Vue 2 App'),
          React.createElement('span', { style: styles.tagPurple }, '/vue3 → Vue 3 App')
        ),
        React.createElement('div', { style: styles.buttonContainer },
          React.createElement(NavLink, {
            to: '/',
            style: styles.buttonGray
          }, '← Back to Dashboard'),
          React.createElement(NavLink, {
            to: '/blog/about',
            style: styles.buttonIndigo
          }, 'Go to About Page →')
        )
      ),

      React.createElement('div', { style: styles.footer },
        React.createElement('h3', { style: styles.footerTitle }, '⚡ Powered by ESMX v3'),
        React.createElement('p', { style: styles.footerDesc }, 'Zero-bundler federation • Multi-framework • TypeScript'),
        React.createElement('div', { style: styles.footerTags },
          React.createElement('span', { style: styles.footerTag }, 'React 18'),
          React.createElement('span', { style: styles.footerTag }, 'TypeScript'),
          React.createElement('span', { style: styles.footerTag }, 'SSR/SSG'),
          React.createElement('span', { style: styles.footerTag }, 'ESMx')
        )
      )
    )
  );
};

export default HomePage;
