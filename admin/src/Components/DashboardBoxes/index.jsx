import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { LiaDropbox } from "react-icons/lia";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="DashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <AiTwotoneGift className="text-[40px] text-blue-700" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">New Orders</h3>
              <b className="text-lg">1,390</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-blue-700" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <AiOutlinePieChart className="text-[40px] text-green-700" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">Sales</h3>
              <b className="text-lg">$57,890</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-green-700" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <BsBank className="text-[35px] text-violet-700" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">Revenue</h3>
              <b className="text-lg">1,390</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-violet-700" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <LiaDropbox className="text-[40px] text-[#ff1b85c7]" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">Total Products</h3>
              <b className="text-lg">1,390</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#ff1b85c7]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default DashboardBoxes;
