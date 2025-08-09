import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const ProductZoom = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSml.current.swiper.slideTo(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-[1200px] mx-auto p-3">
      {/* Thumbnail Slider */}
      <div className="md:w-[15%] w-full md:h-[500px]">
        <Swiper
          ref={zoomSliderSml}
          spaceBetween={10}
          slidesPerView={4}
          direction={"vertical"}
          breakpoints={{
            0: {
              direction: "horizontal",
              slidesPerView: 4,
              spaceBetween: 8,
            },
            768: {
              direction: "vertical",
              slidesPerView: 5,
              spaceBetween: 12,
            },
          }}
          className="h-full"
        >
          {images?.map((img, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              <div
                className={`rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer shadow-sm ${
                  slideIndex === idx
                    ? "border-blue-500 shadow-lg scale-[1.03]"
                    : "border-gray-300 opacity-80 hover:opacity-100 hover:shadow-md"
                }`}
                onClick={() => goto(idx)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-20 md:h-24 lg:h-28 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Image Zoom */}
      <div className="md:w-[85%] w-full border rounded-xl overflow-hidden shadow-lg bg-white">
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
          {images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex items-center justify-center bg-gray-50 h-[300px] sm:h-[400px] md:h-[500px]">
                <InnerImageZoom
                  src={img}
                  zoomType="hover"
                  zoomScale={1.5}
                  className="max-h-full max-w-full object-contain"
                  alt={`Product ${idx}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
