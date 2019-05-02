import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AuthLayout from "../hoc/AuthLayout";
import AlbumList from "../components/AlbumList";

const ALBUMS_QUERY = gql`
  {
    albums {
      id
      name
      images {
        id
        unsplashId
        imageLink
      }
    }
  }
`;

class Home extends React.Component {
  render() {
    return (
      <Query query={ALBUMS_QUERY}>
        {({ loading, error, data }) =>
          data.albums && data.albums.length ? (
            <AlbumList albums={data.albums} />
          ) : (
            <p>No albums to show.</p>
          )
        }
      </Query>
    );
  }
}

export default AuthLayout(Home);
