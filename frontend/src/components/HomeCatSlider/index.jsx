import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
export const HomeCatSlider = () => {
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
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1748409729550_fash.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Fashion</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Electronics</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Bags</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Footwear</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Groceries</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Beauty</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem  py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661105893_well.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Wellness</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link>
              <div className="catitem py-7 bg-white rounded-lg overflow-hidden text-center flex flex-col justify-center items-center gap-4">
                <img
                  src="https://serviceapi.spicezgold.com/download/1749273446706_jw.png"
                  alt=""
                  className="w-[30%]"
                />
                <h3 className="font-[500] text-lg">Jewellery</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
