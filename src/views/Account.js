import React from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";

import AuthLayout from "../hoc/AuthLayout";
import AlbumList from "../components/AlbumList";

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

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      name
    }
  }
`;

class Account extends React.Component {
  state = { user: null };
  async componentDidMount() {
    const response = await this.props.client.query({ query: ME_QUERY });
    this.setState({
      user: response.data.me
    });
  }
  render() {
    const user = this.state.user;
    const display = user ? (
      <Query query={ALBUMS_QUERY} variables={{ userId: user.id }}>
        {({ loading, error, data }) =>
          data.albums && data.albums.length ? (
            <AlbumList albums={data.albums} />
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

export default withApollo(AuthLayout(Account));
