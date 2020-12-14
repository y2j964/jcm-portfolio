import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" location={location} />
      <section className="container">
        <h2 className="text-3xl sm:text-4xl mb-8 font-light text-center">
          404: Not Found
        </h2>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
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
