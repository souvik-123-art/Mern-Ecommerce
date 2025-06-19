import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from '@mui/material/Button';
export const HomeSliderV2 = () => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="homeSliderV2"
      >
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden relative">
            <img
              className="w-full"
              src="https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg"
            />
            <div className="info absolute top-0 -right-[100%] w-[50%] z-50 p-8 h-full flex justify-center items-center flex-col gap-4 opacity-0 transition-all duration-1000">
              <h4 className="text-[20px] font-[300] w-full text-left">
                Big Saving Days Sale
              </h4>
              <h2 className="text-[32px] font-[700] w-full text-left">
                Women Solid Round Green T-Shirt
              </h2>
              <p className="w-full text-left text-lg">
                Starting At Only
                <span className="text-2xl text-primary font-bold">$59.00</span>
              </p>
              <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 self-start">
                Shop Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden">
            <img
              className="w-full"
              src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg"
            />
            <div className="info absolute top-0 -right-[100%] w-[50%] z-50 p-8 h-full flex justify-center items-center flex-col gap-4 opacity-0 transition-all duration-1000">
              <h4 className="text-[20px] font-[300] w-full text-left">
                Big Saving Days Sale
              </h4>
              <h2 className="text-[32px] font-[700] w-full text-left">
                Buy Modern Chair In Black Color
              </h2>
              <p className="w-full text-left text-lg">
                Starting At Only
                <span className="text-2xl text-primary font-bold">$59.00</span>
              </p>
              <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 self-start">
                Shop Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
