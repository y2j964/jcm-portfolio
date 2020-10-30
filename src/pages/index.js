import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostCards from "../components/PostCard/PostCards"

const BlogPostsNone = () => (
  <React.Fragment>
    <h2 className="text-3xl mb-6">No blog posts found</h2>
    <p>
      Add markdown posts to "content/blog" (or the directory you specified for
      the "gatsby-source-filesystem" plugin in gatsby-config.js).
    </p>
  </React.Fragment>
)

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
      {posts.length === 0 ? <BlogPostsNone /> : <PostCards posts={posts} />}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
