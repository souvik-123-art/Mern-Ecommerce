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
    <div className="homecatslider pt-4 pb-12">
      <div className="container mx-auto">
        <Swiper
          navigation={true}
          slidesPerView={8}
          spaceBetween={20}
          modules={[Navigation]}
          className="mySwiper"
        >
          {catData?.length !== 0 &&
            catData?.map((cat) => (
              <SwiperSlide key={cat?._id}>
                <Link>
                  <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                    <img
                      src={cat?.images}
                      alt={cat?.name}
                      className="w-[30%]"
                    />
                    <h3 className="font-[500] text-lg">{cat?.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
