import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

const Banner = ({ title }) => {
  const data = useStaticQuery(graphql`
    query logoQuery {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 360) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const logo = data.logo.childImageSharp.fluid;
  const imgAlt = 'main logo';

  return (
    <section className="banner">
      <div className="logo-wrapper">
        <Image fluid={logo} alt={imgAlt} />
      </div>
      <h1 className="banner__title">{title}</h1>
    </section>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Banner;
