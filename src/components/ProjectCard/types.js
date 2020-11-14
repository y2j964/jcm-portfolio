import PropTypes from 'prop-types';

const projectInterface = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteLink: PropTypes.string.isRequired,
  docsLink: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  isPrimary: PropTypes.bool,
};

export { projectInterface };
