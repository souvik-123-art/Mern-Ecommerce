import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from "../../utils/api";
import {
  setFeaturedProData,
  setPopularProData,
  setProData,
} from "../../redux/Slices/productsDataSlice";
import ProductSkeleton from "../../components/ProductSkeleton";
import { AdsBannerSliderV2 } from "../../components/AdsBannerSliderV2";

export const Home = () => {
  const dispatch = useDispatch();
  const catData = useSelector((state) => state.catData.catData);
  const proData = useSelector((state) => state.proData.proData);
  const popularProduct = useSelector((state) => state.proData.popularProData);
  const featuredProduct = useSelector((state) => state.proData.featuredProData);
  const bannerV1 = useSelector((state) => state.homeBannerData.bannerV1);
  const bannersToShow = [...(bannerV1 || [])]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const filterByCatId = (id) => {
    dispatch(setPopularProData([]));
    fetchDataFromApi(`/api/product/category/${id}`).then((res) => {
      if (!res?.error) {
        dispatch(setPopularProData(res?.data));
      }
    });
  };
  useEffect(() => {
    fetchDataFromApi(`/api/product/category/${catData[0]?._id}`).then((res) => {
      if (!res?.error) {
        dispatch(setPopularProData(res?.data));
      }
    });
  }, [catData]);
  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/api/product"),
      fetchDataFromApi("/api/product/featuredProducts"),
    ])
      .then(([latestProRes, featuredProRes]) => {
        if (!latestProRes?.error) {
          dispatch(setProData(latestProRes?.data));
        }
        if (!featuredProRes?.error) {
          dispatch(setFeaturedProData(featuredProRes?.data));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
                {catData?.length !== 0 &&
                  catData?.map((cat) => (
                    <Tab
                      key={cat?._id}
                      label={cat?.name}
                      onClick={() => filterByCatId(cat?._id)}
                    />
                  ))}
              </Tabs>
            </div>
          </div>
          {popularProduct?.length !== 0 ? (
            <ProductSlider items={6} data={popularProduct} />
          ) : (
            <div className="grid grid-cols-6 gap-4 py-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-1">
                  {/* Skeleton Product Card */}
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto flex">
          <div className="part1 w-[70%]">
            {proData?.length !== 0 && <HomeSliderV2 data={proData} />}
          </div>
          <div className="part2 pl-5 w-[30%] flex flex-col gap-5">
            {bannersToShow?.map((banner) => (
              <BannerBoxV2
                key={banner._id}
                data={banner}
                info={banner.align} // align saved from DB ("left" or "right")
                link={`/product-details/${banner._id}`} // you can customize
              />
            ))}
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
          <AdsBannerSliderV2 items={4} />
        </div>
      </section>
      <section className="bg-white pt-0">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-2">Latest Products</h3>
          {proData?.length !== 0 ? (
            <ProductSlider items={6} data={proData} />
          ) : (
            <div className="grid grid-cols-6 gap-4 py-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-1">
                  {/* Skeleton Product Card */}
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          )}
          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="bg-white py-6">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-2">Featured Products</h3>
          {popularProduct?.length !== 0 ? (
            <ProductSlider items={6} data={featuredProduct} />
          ) : (
            <div className="grid grid-cols-6 gap-4 py-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-1">
                  {/* Skeleton Product Card */}
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          )}
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
