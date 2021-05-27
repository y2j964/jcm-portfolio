import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ProjectCards from '../components/ProjectCard/ProjectCards';

const Projects = ({ data, location }) => {
  const projects = data.allProjectsJson.edges.map(({ node }) => node);
  const author = data.site.siteMetadata.author.name;
  const pageDescription = `A collection of ${author}'s software development side projects`;

  return (
    <Layout title="Projects">
      <SEO title="Projects" description={pageDescription} location={location} />
      <section className="container">
        <h2 className="section-title">Fruits Of Labor</h2>
        <ProjectCards projects={projects} />
      </section>
    </Layout>
  );
};

Projects.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Projects;

export const pageQuery = graphql`
  query AllProjectsQuery {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    allProjectsJson {
      edges {
        node {
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
    }
  }
`;
