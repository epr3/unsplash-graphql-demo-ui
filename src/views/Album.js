import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AuthLayout from "../hoc/AuthLayout";

import FloatingAlbumForm from "../containers/FloatingAlbumForm";

import Image from "../components/Image";
import BaseButton from "../components/BaseButton";

const IMAGES_QUERY = gql`
  query Images($page: Int!) {
    images(page: $page) {
      unsplashId
      imageLink
    }
  }
`;

class Album extends React.Component {
  state = {
    selectedImages: []
  };

  addImageToSelection = image => {
    this.setState(prevState => ({
      selectedImages: prevState.selectedImages.concat(image)
    }));
  };

  render() {
    return (
      <>
        <Query query={IMAGES_QUERY} variables={{ page: 1 }}>
          {({ loading, error, data, fetchMore }) => (
            <div className="section has-text-centered">
              <div className="columns is-multiline">
                {data.images && data.images.length ? (
                  data.images.map(item => (
                    <div
                      key={item.unsplashId}
                      className="column is-one-quarter"
                    >
                      <Image
                        src={item.imageLink}
                        onClick={() =>
                          this.addImageToSelection({
                            unsplashId: item.unsplashId,
                            imageLink: item.imageLink
                          })
                        }
                      />
                    </div>
                  ))
                ) : (
                  <p>No images to show.</p>
                )}
              </div>
              {data.images && data.images.length && (
                <BaseButton
                  type="info"
                  loading={loading}
                  text="Load more"
                  onClick={() =>
                    fetchMore({
                      variables: {
                        page: data.images.length / 16 + 1
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...prev,
                          images: [...prev.images, ...fetchMoreResult.images]
                        };
                      }
                    })
                  }
                />
              )}
            </div>
          )}
        </Query>
        <FloatingAlbumForm images={this.state.selectedImages} />
      </>
    );
  }
}

export default AuthLayout(Album);
