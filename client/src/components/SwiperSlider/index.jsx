import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
export const HomeSlider = () => {
  const lgBanners = useSelector((state) => state.homeBannerData.lgBanners);
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
            {lgBanners?.length !== 0 &&
              lgBanners?.map((banner, idx) => (
                <SwiperSlide key={idx}>
                  <div className="item rounded-3xl overflow-hidden">
                    <img
                      src={banner.images}
                      className="w-full"
                      alt="banner image"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
