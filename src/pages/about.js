import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const About = ({ location }) => {
  return (
    <Layout title="About Me">
      <SEO title="About Me" location={location} />
      <section className="container">
        <h2 className="text-3xl">About</h2>
      </section>
    </Layout>
  );
};

About.propTypes = {
  location: PropTypes.object.isRequired,
};

export default About;
