import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Banner from './Banner/Banner';

const Layout = ({ title, children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="">
        <Banner title={title} />
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
