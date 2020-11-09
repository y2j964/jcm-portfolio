import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import PostCards from '../components/PostCard/PostCards';
import ImgGrid from '../components/ImgGrid/ImgGrid';

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
  const techStackItems = data.allTechStackJson.edges.map(({ node }) => node);

  return (
    <Layout title="Welcome">
      <SEO title="All posts" location={location} />
      <section className="container">
        <h2 className="text-4xl mb-6">Allow me to introduce myself</h2>
        {/* <div className="flex justify-center">
          <Image fixed={avatar} alt="Justin Mooney" />
        </div> */}
        <p className="mb-8">
          My name is Justin Mooney. I am a coder, as in, I write code. I
          specifically am specialized in frontend development and all things
          JavaScript.
        </p>
        <h3 className="text-4xl mt-16 mb-6">
          Here are some technologies I tool around with:
        </h3>
        <ImgGrid gridItems={techStackItems} />
        <div className="my-12">
          <a href="#contact">Contact Me</a>
        </div>
      </section>
      <section className="container">
        {posts.length === 0 ? <BlogPostsNone /> : <PostCards posts={posts} />}
      </section>
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
    allTechStackJson {
      edges {
        node {
          text
          icon {
            childImageSharp {
              fluid(maxWidth: 150, maxHeight: 150) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
