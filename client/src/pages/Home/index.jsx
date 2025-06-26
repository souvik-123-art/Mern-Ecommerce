import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HomeSlider } from "../../components/SwiperSlider";
import { HomeCatSlider } from "../../components/HomeCatSlider";
import { FaShippingFast } from "react-icons/fa";
import { AdsBannerSlider } from "../../components/AdsBannerSlider";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ProductSlider } from "../../components/ProductSlider";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BlogItem } from "../../components/BlogItem";
import { HomeSliderV2 } from "../../components/HomeSliderV2";
import { BannerBoxV2 } from "../../components/BannerBoxV2";
export const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <HomeSlider />
      <HomeCatSlider />
      <section className="bg-white py-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="leftsec">
              <h3 className="text-3xl font-semibold mb-2">Popular Products</h3>
              <p className="text-lg">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightsec w-[50%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Wellness" />
                <Tab label="Jewellery" />
              </Tabs>
            </div>
          </div>
          <ProductSlider items={6} />
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto flex">
          <div className="part1 w-[70%]">
            <HomeSliderV2 />
          </div>
          <div className="part2 pl-5 w-[30%] flex flex-col gap-5">
            <BannerBoxV2
              info={"left"}
              img={
                "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
              }
            />
            <BannerBoxV2
              info={"right"}
              img={
                "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
              }
            />
          </div>
        </div>
      </section>
      <section className="py-8 bg-white">
        <div className="container mx-auto">
          <div className="freeshipping w-4/5 m-auto p-8 border-2 border-primary flex items-center justify-between rounded-md text-primary mb-7">
            <div className="col1 flex items-center gap-4">
              <FaShippingFast className="text-5xl" />
              <span className="text-3xl font-semibold uppercase">
                Free Shipping
              </span>
            </div>
            <div className="col2">
              <p className="font-semibold text-lg">
                Free Delivery Now On Your First Order and over $200
              </p>
            </div>
            <div className="col3">
              <p className="font-bold text-3xl">- Only $200*</p>
            </div>
          </div>
          <AdsBannerSlider items={4} />
        </div>
      </section>
      <section className="bg-white pt-0">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-2">Latest Products</h3>
          <ProductSlider items={6} />
          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="bg-white py-6">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-2">Featured Products</h3>
          <ProductSlider items={6} />
          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="blogSection py-8">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-2">From The Blog</h3>
          <Swiper
            navigation={true}
            slidesPerView={4}
            spaceBetween={30}
            modules={[Navigation]}
            className="blogSwiper"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};
