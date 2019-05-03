import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AuthLayout from "../hoc/AuthLayout";
import AlbumList from "../containers/AlbumList";

const ALBUMS_QUERY = gql`
  query MyAlbums($userId: ID!) {
    albums(userId: $userId) {
      id
      name
      userId
      images {
        id
        unsplashId
        imageLink
      }
      user {
        name
      }
    }
  }
`;

class Account extends React.Component {
  render() {
    const user = this.props.user;
    const display = user ? (
      <Query query={ALBUMS_QUERY} variables={{ userId: user.id }}>
        {({ loading, error, data }) =>
          data.albums && data.albums.length ? (
            <AlbumList albums={data.albums} isEditable userId={user.id} />
          ) : (
            <p>No albums to show.</p>
          )
        }
      </Query>
    ) : (
      <p>No albums to show.</p>
    );
    return display;
  }
}

export default AuthLayout(Account);
