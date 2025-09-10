import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ProductItem } from "../ProductItem";
export const ProductSlider = (props) => {
  return (
    <div className="productSlider py-4 md:py-8">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          400: {
            slidesPerView: props.items >= 3 ? 3 : 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: props.items >= 4 ? 4 : props.items,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: props.items >= 5 ? 5 : props.items,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: props.items >= 6 ? 6 : props.items,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: props.items,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="sliderProducts"
      >
        {props?.data?.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
