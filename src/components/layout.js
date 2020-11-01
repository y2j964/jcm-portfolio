import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="max-w-3xl mx-auto px-8">{children}</main>
      <Footer />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
