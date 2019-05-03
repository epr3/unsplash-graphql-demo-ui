import React from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";

import AuthLayout from "../hoc/AuthLayout";
import AlbumList from "../containers/AlbumList";

const ALBUMS_QUERY = gql`
  {
    albums {
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

class Home extends React.Component {
  componentDidMount() {
    this.props.client.query({
      query: ALBUMS_QUERY
    });
  }
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

export default withApollo(AuthLayout(Home));
