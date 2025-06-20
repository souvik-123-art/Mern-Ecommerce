import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export const ProductZoom = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const zoomSliderBig = useRef()
    const zoomSliderSml = useRef()
    const goto = (index)=>{
        setSlideIndex(index)
        zoomSliderBig.current.swiper.slideTo(index)
        zoomSliderSml.current.swiper.slideTo(index)
    }
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
            <SwiperSlide>
              <div
                className={`item rounded-md cursor-pointer overflow-hidden group ${
                  slideIndex === 0 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(0)}
              >
                <img
                  src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                  className="group-hover:scale-105 transition"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md cursor-pointer overflow-hidden group ${
                  slideIndex === 1 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(1)}
              >
                <img
                  src="https://serviceapi.spicezgold.com/download/1742462485037_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-2-202304220521.webp"
                  className="group-hover:scale-105 transition"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md cursor-pointer overflow-hidden group ${
                  slideIndex === 2 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(2)}
              >
                <img
                  src="https://serviceapi.spicezgold.com/download/1742462485045_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-1-202304220521.webp"
                  className="group-hover:scale-105 transition"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md cursor-pointer overflow-hidden group ${
                  slideIndex === 3 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(3)}
              >
                <img
                  src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
                  className="group-hover:scale-105 transition"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md cursor-pointer overflow-hidden group ${
                  slideIndex === 4 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(4)}
              >
                <img
                  src="https://serviceapi.spicezgold.com/download/1742462383491_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-2-202308161432.webp"
                  className="group-hover:scale-105 transition"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>
        <div className="zoom w-[85%] h-[500px] rounded-md overflow-hidden">
          <Swiper spaceBetween={0} slidesPerView={1} ref={zoomSliderBig}>
            <SwiperSlide>
              <InnerImageZoom
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="https://serviceapi.spicezgold.com/download/1742462485037_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-2-202304220521.webp"
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="https://serviceapi.spicezgold.com/download/1742462485045_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-1-202304220521.webp"
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="https://serviceapi.spicezgold.com/download/1742462383491_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-2-202308161432.webp"
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};
