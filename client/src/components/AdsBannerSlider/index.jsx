import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BannerBox } from "../BannerBox";
export const AdsBannerSlider = (props) => {
  return (
    <div className="py-3 md:py-5 w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          400: {
            slidesPerView: props.items >= 2 ? 2 : 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: props.items >= 3 ? 3 : props.items,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: props.items >= 4 ? 4 : props.items,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: props.items,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="sliderAds"
      >
        <SwiperSlide>
          <BannerBox img={"Images/ads/banner1.webp"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"Images/ads/banner2.webp"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"Images/ads/banner3.webp"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"Images/ads/banner4.webp"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"Images/ads/banner5.jpg"} link={"/"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
