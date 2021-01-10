import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Bio from '../../components/Bio/bio';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = pageContext;

  return (
    <Layout title="Blog">
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        location={location}
        isArticle
      />
      <section className="container">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h2 className="blog-post__title" itemProp="headline">
              {post.frontmatter.title}
            </h2>
            <time
              className="blog-post__date"
              dateTime={new Date(post.frontmatter.date).toISOString()}
            >
              {post.frontmatter.date}
            </time>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="blog-post__body"
            itemProp="articleBody"
          />
          <hr className="partition" />
          <footer>
            <Bio />
          </footer>
        </article>
        <nav className="mt-12">
          <ul className="flex flex-wrap justify-between">
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
