import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const HomeCatSlider = () => {
  const catData = useSelector((state) => state.catData.catData);
  return (
    <div className="homecatslider pt-4 pb-8 md:pb-12">
      <div className="container mx-auto px-2 md:px-0">
        <Swiper
          navigation={true}
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            400: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {catData?.length !== 0 &&
            catData?.map((cat) => (
              <SwiperSlide key={cat?._id}>
                <Link to={`/product-listing?catId=${cat?._id}`}>
                  <div className="catitem py-4 md:py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-2 md:gap-4">
                    <img
                      src={cat?.images}
                      alt={cat?.name}
                      className="w-[40%] md:w-[30%]"
                    />
                    <h3 className="font-[500] text-sm md:text-lg px-1">
                      {cat?.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
