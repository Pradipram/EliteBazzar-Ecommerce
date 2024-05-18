import React from 'react';
import "./footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div>
        &copy; {currentYear} EliteBazzar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;