import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ME_QUERY = gql`
  {
    me {
      id
      email
      name
    }
  }
`;

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              alt="logo"
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>
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
            <a className="navbar-item">Home</a>

            <a className="navbar-item">Create an album</a>
          </div>
          <Query query={ME_QUERY}>
            {({ loading, error, data }) => (
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-primary">
                      <strong>My account</strong>
                    </a>
                    <a className="button is-primary">
                      <strong>Log out</strong>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </Query>
        </div>
      </nav>
    );
  }
}

export default Header;
