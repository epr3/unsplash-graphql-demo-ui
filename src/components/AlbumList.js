import React from "react";
import PropTypes from "prop-types";

import Album from "./Album";

const AlbumList = props => (
  <div className="columns is-multiline" style={{ marginTop: "25px" }}>
    {props.albums && props.albums.length ? (
      props.albums.map(item => (
        <div key={item.id} className="column is-2">
          <Album album={item} />
        </div>
      ))
    ) : (
      <p>No albums to show.</p>
    )}
  </div>
);

AlbumList.propTypes = {
  albums: PropTypes.array
};

export default AlbumList;
