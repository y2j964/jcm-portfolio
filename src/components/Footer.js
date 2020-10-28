import React from "react"
import { useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

const Footer = props => {
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
  `)

  const author = data.site.siteMetadata.author.name

  return (
    <footer className="footer">
      <p className="footer__copyright">
        Copyright © {new Date().getFullYear()} {author}. All Rights Reserved
      </p>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer
