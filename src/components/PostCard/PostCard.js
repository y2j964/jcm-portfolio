import React from 'react';
import { Link } from 'gatsby';
import { postCardInterface } from './types';

const PostCard = ({ title, description, date, slug }) => {
  return (
    <article
      className="post-card"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header className="post-card__header">
        <h2 className="post-card__title">
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{date}</small>
      </header>
      <p itemProp="description" className="post-card__description">
        {description}
      </p>
    </article>
  );
};

PostCard.propTypes = {
  ...postCardInterface,
};

export default PostCard;
