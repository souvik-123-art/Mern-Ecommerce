import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BannerBoxV2 } from "../BannerBoxV2";
import { useSelector } from "react-redux";
export const AdsBannerSliderV2 = (props) => {
  const bannerV1 = useSelector((state) => state.homeBannerData.bannerV1);
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="sliderAds"
      >
        {bannerV1?.length !== 0 &&
          bannerV1?.map((banner) => (
            <SwiperSlide key={banner._id}>
              <BannerBoxV2 data={banner} info={banner.align} link={"/"} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
