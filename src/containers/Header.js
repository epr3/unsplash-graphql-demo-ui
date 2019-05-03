import React from "react";
import { Link, navigate } from "@reach/router";

import logo from "../logo.svg";

class Header extends React.Component {
  logOut = () => {
    localStorage.removeItem("unsplash:access");
    navigate("/login", { replace: true });
  };
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img alt="logo" src={logo} width="100" height="100" />
          </Link>
          <span
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </span>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/albums/new" className="navbar-item">
              Create an album
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/me" className="button is-primary">
                  <strong>My account</strong>
                </Link>
                <button className="button is-primary" onClick={this.logOut}>
                  <strong>Log out</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
