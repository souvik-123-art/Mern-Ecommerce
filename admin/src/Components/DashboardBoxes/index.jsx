import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="DashboardBoxesSlider"
      >
        <SwiperSlide>
            <div className="box p-4 rounded-md border border-gray-200 flex items-center gap-4">
                <div className="info w-[70%]">
                    <h3>New Orders</h3>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default DashboardBoxes;
