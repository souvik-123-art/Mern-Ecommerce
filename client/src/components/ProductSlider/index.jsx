import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ProductItem } from "../ProductItem";
export const ProductSlider = (props) => {
  return (
    <div className="productSlider py-8">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
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
