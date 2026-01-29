import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@esmx/router-react';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { Router } from '@esmx/router';

const router = Router.getInstance();

router.addRoute('/react', { component: HomePage });
router.addRoute('/react/about', { component: AboutPage });
router.addRoute('/react/contact', { component: ContactPage });

export function App() {
  return (
    <RouterProvider>
      <div className="app">
        <HomePage />
      </div>
    </RouterProvider>
  );
}

if (typeof window !== 'undefined') {
  const container = document.getElementById('app');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}