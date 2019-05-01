import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AuthLayout from "../containers/Header";
import AlbumList from "../components/AlbumList";

const ALBUMS_QUERY = gql`
  {
    albums {
      id
      name
      images {
        id
        unsplashId
      }
    }
  }
`;

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        test
      </div>
    );
  }
}

export default AuthLayout(Home);
