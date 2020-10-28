import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ location, title, children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="max-w-3xl mx-auto px-8">{children}</main>
      <Footer />
    </React.Fragment>
  )
}

export default Layout
