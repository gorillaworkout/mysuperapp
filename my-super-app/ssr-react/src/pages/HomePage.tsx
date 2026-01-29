import React from 'react';

interface HomePageProps {
  title?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ title = 'React Micro App' }) => {
  return (
    <div className="react-home">
      <h1>{title}</h1>
      <p>Welcome to the React Micro-Frontend application!</p>
      <div className="react-features">
        <h2>Features:</h2>
        <ul>
          <li>React 18+ with hooks</li>
          <li>Shared router state</li>
          <li>SSR-compatible</li>
          <li>TypeScript</li>
        </ul>
      </div>
    </div>
  );
};

export async function asyncData() {
  return {
    title: 'React Micro App - Server Rendered'
  };
}