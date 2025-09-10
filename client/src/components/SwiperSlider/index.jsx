import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";

export const HomeSlider = () => {
  const lgBanners = useSelector((state) => state.homeBannerData.lgBanners);
  const swiperRef = useRef(null);
  const isCartPanelOpen = useSelector((state) => state.cartPanel.cartPanelOpen);

  // Prevent touch events from propagating when cart is open
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;

      const handleTouchStart = (e) => {
        if (isCartPanelOpen) {
          e.stopPropagation();
          e.preventDefault();
        }
      };

      swiperInstance.wrapperEl.addEventListener(
        "touchstart",
        handleTouchStart,
        { passive: false }
      );
      swiperInstance.wrapperEl.addEventListener("mousedown", handleTouchStart);

      return () => {
        if (swiperInstance && swiperInstance.wrapperEl) {
          swiperInstance.wrapperEl.removeEventListener(
            "touchstart",
            handleTouchStart
          );
          swiperInstance.wrapperEl.removeEventListener(
            "mousedown",
            handleTouchStart
          );
        }
      };
    }
  }, [isCartPanelOpen]);

  return (
    <>
      <div className="homeSlider py-2 md:py-4">
        <div className="container mx-auto px-2 md:px-0">
          <Swiper
            ref={swiperRef}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            spaceBetween={10}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 1.1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 1.1,
                spaceBetween: 30,
                centeredSlides: true,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="sliderHome"
            onTouchStart={(swiper, event) => {
              if (isCartPanelOpen) {
                event.stopPropagation();
              }
            }}
            onSlideChange={() => {
              // Prevent any action during slide change if cart is open
              if (isCartPanelOpen) {
                return false;
              }
            }}
          >
            {lgBanners?.length !== 0 &&
              lgBanners?.map((banner, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="item rounded-xl md:rounded-3xl overflow-hidden"
                    onClick={(e) => {
                      if (isCartPanelOpen) {
                        e.stopPropagation();
                      }
                    }}
                    onTouchStart={(e) => {
                      if (isCartPanelOpen) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <img
                      src={banner.images}
                      className="w-full"
                      alt="banner image"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
