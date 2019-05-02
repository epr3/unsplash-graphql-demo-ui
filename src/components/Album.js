import React from "react";
import Swiper from "react-id-swiper";
import { EffectFade, Autoplay } from "swiper/dist/js/swiper.esm";

import Image from "./Image";

const Album = props => {
  console.log(props.images);
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
            <Image src={item.imageLink} onClick={() => {}}/>
          </div>
        ))
      : null;
  return <Swiper {...params}>{slides}</Swiper>;
};

export default Album;
