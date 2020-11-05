import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

const Blog = ({ location }) => {
  return (
    <Layout title="Blog">
      <SEO title="Blog" location={location} />
      <section className="container">
        <h2 className="text-3xl">Blog</h2>
      </section>
    </Layout>
  );
};

Blog.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Blog;
