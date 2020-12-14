import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LinkedIn from '../../icons/LinkedIn';
import Github from '../../icons/Github';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query authorNameQuery {
      site {
        siteMetadata {
          author {
            name
            github
            linkedIn
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata.author.name;
  const githubUrl = data.site.siteMetadata.author.github;
  const linkedInUrl = data.site.siteMetadata.author.linkedIn;

  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <div className="flex justify-center mb-4">
          <a href={githubUrl} className="mr-4" aria-label="github account">
            <Github />
          </a>
          <a href={linkedInUrl} aria-label="linkedIn account">
            <LinkedIn />
          </a>
        </div>
        <p className="footer__copyright">
          Copyright © {new Date().getFullYear()} {author}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
