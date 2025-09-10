import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

import { LiaDropbox } from "react-icons/lia";
import { useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const DashboardBoxes = (props) => {
  const orderCount = useSelector((state) => state.orderData.ordersCount);
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="DashboardBoxesSlider"
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
          768: { slidesPerView: 2, spaceBetween: 15 }, // Tablets
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Small Desktops
          1280: { slidesPerView: 4, spaceBetween: 25 }, // Large Desktops
        }}
      >
        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <AiTwotoneGift className="text-[40px] text-blue-700" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">New Orders</h3>
              <b className="text-lg">{orderCount}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-blue-700" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <AiOutlinePieChart className="text-[40px] text-green-700" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">Sales</h3>
              <b className="text-lg">
                ₹ {(props?.sales).toLocaleString("en-IN")}
              </b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-green-700" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <FiUsers className="text-[35px] text-violet-700" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">Users</h3>
              <b className="text-lg">{props?.usersCount}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-violet-700" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer hover:bg-[#f1faff] rounded-md border border-gray-200 flex items-center gap-4 bg-white">
            <LiaDropbox className="text-[40px] text-[#ff1b85c7]" />
            <div className="info w-[70%]">
              <h3 className="text-md text-black/50">Total Products</h3>
              <b className="text-lg">{props?.proCount}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#ff1b85c7]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default DashboardBoxes;
