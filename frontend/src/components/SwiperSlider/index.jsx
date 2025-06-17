import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
export const HomeSlider = () => {
  return (
    <>
      <div className="homeSlider py-4">
        <div className="container mx-auto">
          <Swiper
            pagination={{ clickable: true }}
            spaceBetween={30}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={1.1}
            centeredSlides={true}
            modules={[Pagination, Autoplay]}
            className="sliderHome"
          >
            <SwiperSlide>
              <div className="item rounded-3xl overflow-hidden">
                <img
                  src="Images/banners/banner1.jpg"
                  className="w-full"
                  alt="banner image"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-3xl overflow-hidden">
                <img
                  src="Images/banners/banner2.jpg"
                  className="w-full"
                  alt="banner image"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-3xl overflow-hidden">
                <img
                  src="Images/banners/banner3.jpg"
                  className="w-full"
                  alt="banner image"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-3xl overflow-hidden">
                <img
                  src="Images/banners/banner4.jpg"
                  className="w-full"
                  alt="banner image"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
