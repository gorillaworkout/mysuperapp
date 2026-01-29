import React from 'react';
import { RouterLink } from '@esmx/router-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="react-about">
      <h1>About React App</h1>
      <p>This is a React micro-app within the ESMX architecture.</p>
      <div className="navigation">
        <RouterLink to="/react" activeClass="active">
          Back to Home
        </RouterLink>
      </div>
    </div>
  );
}