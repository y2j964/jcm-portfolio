import React from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import { projectInterface } from './types';

const ProjectCards = ({ projects }) => {
  const projectFrags = projects.map(
    ({ title, description, docsLink, siteLink, image }, index) => (
      <li key={siteLink} className="project-cards-list__item">
        <ProjectCard
          title={title}
          description={description}
          docsLink={docsLink}
          siteLink={siteLink}
          image={image.childImageSharp.fluid}
          isPrimary={(index + 1) % 2 === 0}
        />
      </li>
    )
  );
  return <ul className="project-cards-list">{projectFrags}</ul>;
};

ProjectCards.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape(projectInterface)),
};

export default ProjectCards;
