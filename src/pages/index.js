import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import PostCards from '../components/PostCard/PostCards';

const BlogPostsNone = () => (
  <React.Fragment>
    <h2 className="text-3xl mb-6">No blog posts found</h2>
    <p>
      Add markdown posts to &quot;content/blog&quot; (or the directory you
      specified for the &quot;gatsby-source-filesystem&quot; plugin in
      gatsby-config.js).
    </p>
  </React.Fragment>
);

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <SEO title="All posts" location={location} />
      <Bio />
      {posts.length === 0 ? <BlogPostsNone /> : <PostCards posts={posts} />}
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
