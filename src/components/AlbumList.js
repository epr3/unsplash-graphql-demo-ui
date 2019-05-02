import React from "react";
import PropTypes from "prop-types";

import Album from "./Album";

const AlbumList = props => (
  <div className="columns is-multiline">
    <div className="column">
      {props.albums && props.albums.length ? (
        props.albums.map(item => <Album key={item.id} album={item} />)
      ) : (
        <p>No albums to show.</p>
      )}
    </div>
  </div>
);

AlbumList.propTypes = {
  albums: PropTypes.array
};

export default AlbumList;
