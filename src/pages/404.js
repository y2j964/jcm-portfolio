import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location} title={'JCM Portfolio'}>
      <SEO title="404: Not Found" location={location} />
      <section className="container">
        <h2 className="section-title mb-8">404: Not Found</h2>
        <p>Would you believe it! This route doesn&#39;t exist. Shucks.</p>
      </section>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
