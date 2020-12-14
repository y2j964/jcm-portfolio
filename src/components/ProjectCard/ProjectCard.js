import React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';
import { projectInterface } from './types';

/* eslint-disable react/prop-types */
// prop types are properly referenced in types file

const getClassModifier = isPrimary =>
  isPrimary
    ? { projectCardClass: 'project-card--primary', btnClass: 'btn--primary' }
    : { projectCardClass: 'project-card--accent', btnClass: 'btn--accent' };

const ProjectCard = ({
  title,
  description,
  siteLink,
  docsLink,
  image,
  isPrimary = false,
}) => {
  const { projectCardClass, btnClass } = getClassModifier(isPrimary);

  return (
    <article className={`project-card ${projectCardClass}`}>
      <div className="project-card__text-container">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__body">{description}</p>
        <div className="flex">
          <a className={`btn ${btnClass}`} href={siteLink}>
            Live Site
          </a>
          <a className={`btn ${btnClass}`} href={docsLink}>
            Docs
          </a>
        </div>
      </div>
      <div className="project-card__img-container">
        <Image fluid={image} alt={title} className="project-card__img" />
      </div>
    </article>
  );
};

ProjectCard.propTypes = projectInterface;

export default ProjectCard;
