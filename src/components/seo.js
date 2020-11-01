import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({
  title,
  isArticle = false,
  location,
  description = '',
  imgUrl = '',
  imgAlt = '',
  lang = 'en',
  meta = [],
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  const { siteUrl } = site.siteMetadata;

  const metaProps = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: isArticle ? `article` : `website`,
    },
    {
      property: `og:site_name`,
      content: defaultTitle,
    },
    {
      property: `og:url`,
      content: `${siteUrl}${location.pathname}`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  if (isArticle) {
    const additionalMetaProps = [
      {
        name: `twitter:card`,
        content: `summary`,
      },
      {
        name: `twitter:image:alt`,
        content: imgAlt || '',
      },
      {
        property: `og:image`,
        content: imgUrl || '',
      },
    ];
    metaProps.push(...additionalMetaProps);
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={metaProps.concat(meta)}
    />
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  isArticle: PropTypes.bool,
  description: PropTypes.string,
  location: PropTypes.object,
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
};

export default SEO;
