import React from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard';
import { postInterface } from './types';

const PostCards = ({ posts }) => {
  const postFrags = posts.map(post => {
    const { title, date } = post.frontmatter;
    const description = post.frontmatter.description || post.excerpt;
    const { slug } = post.fields;

    return (
      <li key={slug}>
        <PostCard
          title={title}
          description={description}
          date={date}
          slug={slug}
        />
      </li>
    );
  });

  return <ol className="">{postFrags}</ol>;
};

PostCards.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(postInterface)),
};

export default PostCards;
