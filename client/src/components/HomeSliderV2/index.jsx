import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export const HomeSliderV2 = (props) => {
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
        {props?.data?.map((item) => {
          if (item?.isDisplayOnHomeBanner && item?.bannerImages?.length !== 0) {
            return (
              <SwiperSlide>
                <div className="item w-full rounded-md overflow-hidden relative">
                  <img className="w-full" src={item?.bannerImages[0]} />
                  <div className="info absolute top-0 -right-[100%] w-[50%] z-50 p-8 h-full flex justify-center items-center flex-col gap-4 opacity-0 transition-all duration-1000">
                    <h4 className="text-[20px] font-[300] w-full text-left">
                      {item?.bannerTitleName}
                    </h4>
                    <h2 className="text-[32px] font-['lexend_giga'] font-[700] w-full text-left">
                      {item?.name}
                    </h2>
                    <p className="w-full text-left text-lg">
                      Starting At Only{" "}
                      <span className="text-2xl text-primary font-bold">
                        ₹{item?.price.toLocaleString("en-IN")}/-
                      </span>
                    </p>
                    <Link
                      className="w-full block"
                      to={`/product-details/${item?._id}`}
                    >
                      <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 self-start">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </>
  );
};
