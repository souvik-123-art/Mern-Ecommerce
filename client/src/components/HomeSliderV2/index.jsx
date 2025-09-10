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
              <SwiperSlide key={item?._id}>
                <div className="item w-full rounded-md overflow-hidden relative group">
                  <img
                    className="w-full h-auto object-cover"
                    src={item?.bannerImages[0]}
                    alt={item?.bannerTitleName || "Banner Image"}
                  />
                  <div className="info absolute top-0 right-0 w-full md:w-1/2 p-6 md:p-8 h-full bg-black bg-opacity-50 text-white flex flex-col justify-center items-start gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <h4 className="text-lg md:text-xl font-light">
                      {item?.bannerTitleName}
                    </h4>
                    <h2 className="text-2xl md:text-4xl font-bold font-['lexend_giga']">
                      {item?.name}
                    </h2>
                    <p className="text-md md:text-lg">
                      Starting At{" "}
                      <span className="text-2xl text-primary font-bold">
                        ₹{item?.price.toLocaleString("en-IN")}/-
                      </span>
                    </p>
                    <Link to={`/product-details/${item?._id}`}>
                      <Button className="!px-4 !py-2 !bg-primary !text-white hover:!bg-gray-900">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
          return null;
        })}
      </Swiper>
    </>
  );
};
