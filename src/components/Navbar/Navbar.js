import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Navbar = props => {
  return (
    <nav className="navbar">
      <div className="navbar__item">
        <a href="/">JCM</a>
      </div>
      <ul className="navbar-secondary-group">
        <li className="navbar__item">
          <Link className="" to="/">
            Blog
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="" to="/">
            Projects
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="" to="/">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

Navbar.propTypes = {}

export default Navbar
