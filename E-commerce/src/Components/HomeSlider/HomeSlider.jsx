import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import ph1 from "../../assets/images/slider-image-1.jpeg";
import ph2 from "../../assets/images/slider-image-2.jpeg";
import ph3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-8">
        <div className="col-span-8">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            style={{ height: "100%" }}
          >
            <SwiperSlide>
              <img
                src={ph1}
                className="w-full h-full object-cover"
                alt="photo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={ph1}
                className="w-full h-full object-cover"
                alt="photo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={ph1}
                className="w-full h-full object-cover"
                alt="photo"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <div className="h-1/2">
            <img src={ph2} className="w-full h-full object-cover" alt="photo" />
          </div>
          <div className="h-1/2">
            <img src={ph3} className="w-full h-full object-cover" alt="photo" />
          </div>
        </div>
      </div>
    </>
  );
}
