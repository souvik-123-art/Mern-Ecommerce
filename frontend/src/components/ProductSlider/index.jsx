import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ProductItem } from '../ProductItem';
export const ProductSlider = (props) => {
  return (
    <div className='productSlider py-8'>
        <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="sliderProducts"
              >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
              </Swiper>
    </div>
  );
};
