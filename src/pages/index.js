import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import ProjectCard from '../components/ProjectCard/ProjectCard';

import ImgGrid from '../components/ImgGrid/ImgGrid';
import PostCard from '../components/PostCard/PostCard';

const BlogIndex = ({ data, location }) => {
  const techStackItems = data.allTechStackJson.edges.map(({ node }) => node);
  const featuredProject = data.projectsJson;
  const featuredPost = data.markdownRemark;

  return (
    <Layout title="Welcome">
      <SEO title="All posts" location={location} />
      <section className="container partition-bottom">
        <h2 className="text-4xl font-light mb-6 text-center">
          Allow me to introduce myself
        </h2>
        {/* <div className="flex justify-center">
          <Image fixed={avatar} alt="Justin Mooney" />
        </div> */}
        <p className="mb-8">
          My name is Justin Mooney. I am a coder, as in, I write code. I
          specifically am specialized in frontend development and all things
          JavaScript. I am currently looking for work.
        </p>
        <h3 className="text-3xl font-light mt-16 mb-12 text-center">
          Here are some technologies I tool around with
        </h3>
        <ImgGrid gridItems={techStackItems} />
      </section>
      <section className="container partition-bottom">
        <h2 className="text-4xl font-light mb-6 text-center">
          Featured Project
        </h2>
        <ProjectCard
          title={featuredProject.title}
          description={featuredProject.description}
          docsLink={featuredProject.docsLink}
          siteLink={featuredProject.siteLink}
          image={featuredProject.image.childImageSharp.fluid}
        />
      </section>
      <section className="container partition-bottom">
        <h2 className="text-4xl font-light mb-6 text-center">
          Featured Blog Post
        </h2>
        <PostCard
          title={featuredPost.frontmatter.title}
          date={featuredPost.frontmatter.date}
          description={featuredPost.frontmatter.description}
          slug={featuredPost.fields.slug}
        />
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
  query HomeQuery {
    site {
      siteMetadata {
        title
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
    projectsJson(title: { eq: "NetStruck" }) {
      title
      description
      docsLink
      siteLink
      image {
        childImageSharp {
          fluid(maxWidth: 705) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: "/footnote-tooltip/" } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
