import React from 'react';
import { Link } from 'gatsby';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__item">
        <Link
          to="/"
          className="navbar__link"
          activeClassName="navbar__link--is-active"
        >
          JCM
        </Link>
      </div>
      <ul className="navbar-secondary-group">
        <li className="navbar__item">
          <Link
            to="/blog"
            className="navbar__link"
            activeClassName="navbar__link--is-active"
          >
            Blog
          </Link>
        </li>
        <li className="navbar__item">
          <Link
            to="/projects"
            className="navbar__link"
            activeClassName="navbar__link--is-active"
          >
            Projects
          </Link>
        </li>
        <li className="navbar__item">
          <Link
            to="/about"
            className="navbar__link"
            activeClassName="navbar__link--is-active"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
