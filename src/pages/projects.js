import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const Projects = ({ location }) => {
  return (
    <Layout title="Projects">
      <SEO title="Projects" location={location} />
      <section className="container">
        <h2 className="text-3xl">Projects</h2>
      </section>
    </Layout>
  );
};

Projects.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Projects;
