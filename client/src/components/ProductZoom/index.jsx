import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export const ProductZoom = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSml.current.swiper.slideTo(index);
  };
  return (
    <>
      <div className="flex gap-3">
        <div className="slider w-[15%]">
          <Swiper
            ref={zoomSliderSml}
            direction={"vertical"}
            spaceBetween={10}
            slidesPerView={4}
            className="sliderproductimage h-[400px] overflow-hidden"
          >
            {props?.data?.length !== 0 &&
              props?.data?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className={`item rounded-md cursor-pointer border overflow-hidden group ${
                      slideIndex === idx
                        ? "border-primary shadow-lg scale-[1.03]"
                        : "border-gray-300 opacity-80 hover:opacity-100 hover:shadow-md"
                    }`}
                    onClick={() => goto(idx)}
                  >
                    <img
                      src={img}
                      className="w-full h-[80px] object-cover group-hover:scale-105 transition bg-white"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="zoom w-[85%] h-[500px] rounded-md overflow-hidden">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            ref={zoomSliderBig}
            onSlideChange={(swiper) => {
              const newIndex = swiper.activeIndex;
              setSlideIndex(newIndex);
              zoomSliderSml.current.swiper.slideTo(newIndex);
            }}
          >
            {props?.data?.length !== 0 &&
              props?.data?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <InnerImageZoom src={img} zoomType="hover" zoomScale={1} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
