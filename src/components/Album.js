import React from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import { EffectFade, Autoplay } from "swiper/dist/js/swiper.esm";

import Image from "./Image";

const Album = props => {
  const params = {
    modules: [EffectFade, Autoplay],
    direction: "horizontal",
    effect: "fade",
    autoplay: {
      disableOnInteraction: false
    },
    on: {
      slideChange: function() {
        if (this.activeIndex === this.slides.length - 1) {
          this.slideTo(1);
        }
      }
    }
  };
  const slides =
    props.album && props.album.images && props.album.images.length
      ? props.album.images.map(item => (
          <div key={item.unsplashId} className="swiper-slide">
            <Image src={item.imageLink} onClick={() => {}} />
          </div>
        ))
      : null;

  const actions = props.isEditable ? (
    <div className="card-footer">
      <span onClick={props.deleteAction} className="card-footer-item">
        Delete
      </span>
    </div>
  ) : null;
  return (
    <div className="card">
      <div className="card-content">
        <h5 className="title">{props.album.name}</h5>
        <span className="subtitle">By {props.album.user.name}</span>
        <Swiper {...params}>{slides}</Swiper>
      </div>
      {actions}
    </div>
  );
};

Album.propTypes = {
  isEditable: PropTypes.bool
};

Image.defaultProps = {
  isEditable: false
};

export default Album;
