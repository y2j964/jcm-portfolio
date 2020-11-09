import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';

const IconGrid = ({ gridItems }) => {
  const iconItemFrags = gridItems.map((gridItem, index) => (
    <li key={index}>
      <Image
        fluid={gridItem.icon.childImageSharp.fluid}
        alt={gridItem.text}
        // objectFit="cover"
        // objectPosition="50% 50%"
      />
    </li>
  ));
  return <ul className="img-grid">{iconItemFrags}</ul>;
};

IconGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
    })
  ),
};

export default IconGrid;
