import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import ProjectCard from '../components/ProjectCard/ProjectCard';

import ImgGrid from '../components/ImgGrid/ImgGrid';

const BlogIndex = ({ data, location }) => {
  const techStackItems = data.allTechStackJson.edges.map(({ node }) => node);
  const featuredProject = data.projectsJson;

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
          JavaScript.
        </p>
        <h3 className="text-4xl font-light mt-16 mb-6 text-center">
          Here are some technologies I tool around with:
        </h3>
        <ImgGrid gridItems={techStackItems} />
        <div className="my-12">
          <a href="#contact">Contact Me</a>
        </div>
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
  }
`;
