import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query authorNameQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata.author.name;

  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <p className="footer__copyright">
          Copyright © {new Date().getFullYear()} {author}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
