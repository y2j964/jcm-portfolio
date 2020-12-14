import React from 'react';
import PropTypes from 'prop-types';

export default function LinkedIn({ width, height, fill }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={width || '30'}
      height={height || '30'}
      fill={fill || '#a9a9a9'}
      aria-hidden="true"
    >
      <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z"></path>
      <path d="M2 12h6v18h-6v-18z"></path>
      <path d="M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
    </svg>
  );
}

LinkedIn.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};
