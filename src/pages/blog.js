import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import PostCards from '../components/PostCard/PostCards';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

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

const Blog = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout title="Blog">
      <SEO title="Blog" location={location} />
      <section className="container">
        <h2 className="text-3xl">Blog</h2>
        {posts.length === 0 ? <BlogPostsNone /> : <PostCards posts={posts} />}
      </section>
    </Layout>
  );
};

Blog.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Blog;

export const pageQuery = graphql`
  query AllBlogPostsQuery {
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
