import React from "react";
import Swiper from "react-id-swiper";
import { EffectFade, Autoplay } from "swiper/dist/js/swiper.esm";

const Album = props => {
  const params = {
    modules: [EffectFade, Autoplay],
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
  const slides = props.album.images.map(item => (
    <div className="card" key={item.unsplashId}>
      <div className="card-image">
        <img className="image is-4by3" src={item.imageLink} alt="album" />
      </div>
    </div>
  ));
  return <Swiper {...params}>{slides}</Swiper>;
};

export default Album;
