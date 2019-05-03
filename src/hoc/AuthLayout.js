import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "../containers/Header";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      name
    }
  }
`;

function AuthLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <div className="container is-fluid">
          <Header />
          <Query query={ME_QUERY}>
            {({ loading, error, data }) => (
              <WrappedComponent user={data.me} {...this.props} />
            )}
          </Query>
        </div>
      );
    }
  };
}

export default AuthLayout;
