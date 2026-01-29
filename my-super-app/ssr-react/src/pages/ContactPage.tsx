import React from 'react';
import { RouterLink } from '@esmx/router-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="react-contact">
      <h1>Contact React Team</h1>
      <p>Get in touch with the React development team.</p>
      <div className="navigation">
        <RouterLink to="/react" activeClass="active">
          Back to Home
        </RouterLink>
      </div>
    </div>
  );
}