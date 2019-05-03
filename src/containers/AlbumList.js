import React from "react";
import PropTypes from "prop-types";

import gql from "graphql-tag";
import { withApollo } from "react-apollo";

import Album from "../components/Album";

const DELETE_ALBUM_MUTATION = gql`
  mutation deleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;

const MY_ALBUMS_QUERY = gql`
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

const ALBUMS_QUERY = gql`
  query Albums {
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

class AlbumList extends React.Component {
  static propTypes = {
    albums: PropTypes.array.isRequired,
    isEditable: PropTypes.bool
  };

  static defaultProps = {
    isEditable: false
  };

  editAction = id => {};

  deleteAction = async id => {
    await this.props.client.mutate({
      mutation: DELETE_ALBUM_MUTATION,
      variables: { id },
      update: (proxy, { data: { deleteAlbum } }) => {
        try {
          const data = proxy.readQuery({
            query: MY_ALBUMS_QUERY,
            variables: { userId: this.props.userId }
          });
          const generalData = proxy.readQuery({
            query: ALBUMS_QUERY
          });
          const albumIndex = generalData.albums.findIndex(
            item => item.id === deleteAlbum
          );
          const index = data.albums.findIndex(item => item.id === deleteAlbum);
          data.albums.splice(index, 1);
          generalData.albums.splice(albumIndex, 1);
          proxy.writeQuery({
            query: MY_ALBUMS_QUERY,
            data,
            variables: { userId: this.props.userId }
          });
          proxy.writeQuery({
            query: ALBUMS_QUERY,
            data: generalData
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  render() {
    return (
      <div className="columns is-multiline" style={{ marginTop: "25px" }}>
        {this.props.albums && this.props.albums.length ? (
          this.props.albums.map(item => (
            <div key={item.id} className="column is-2">
              <Album
                album={item}
                isEditable={this.props.isEditable}
                deleteAction={() => this.deleteAction(item.id)}
              />
            </div>
          ))
        ) : (
          <p>No albums to show.</p>
        )}
      </div>
    );
  }
}

export default withApollo(AlbumList);
