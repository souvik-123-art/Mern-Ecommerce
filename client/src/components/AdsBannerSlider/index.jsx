import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BannerBox } from "../BannerBox";
export const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="sliderAds"
      >
        <SwiperSlide>
          <BannerBox img={'Images/ads/banner1.webp'} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={'Images/ads/banner2.webp'} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={'Images/ads/banner3.webp'} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={'Images/ads/banner4.webp'} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={'Images/ads/banner5.jpg'} link={"/"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
