import React from "react"
import { useStaticQuery } from "gatsby"
import Navbar from "./Navbar"

const Layout = ({ location, title, children }) => {
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
    <React.Fragment>
      <Navbar />
      <main className="max-w-3xl mx-auto px-8">{children}</main>
      <footer className="max-w-screen-xl mx-auto px-4 sm:px-8 py-6 mt-10">
        <p className="text-center text-sm">
          Copyright © {new Date().getFullYear()} {author}. All Rights Reserved
        </p>
      </footer>
    </React.Fragment>
  )
}

export default Layout
