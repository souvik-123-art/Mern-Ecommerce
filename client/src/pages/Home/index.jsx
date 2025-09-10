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
  const blogs = useSelector((state) => state.blogData.blogData);
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
      <section className="bg-white py-4 md:py-8">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6">
            <div className="leftsec mb-4 md:mb-0">
              <h3 className="text-xl md:text-3xl font-semibold mb-2">
                Popular Products
              </h3>
              <p className="text-sm md:text-lg">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightsec w-full md:w-[50%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                  maxWidth: "100%",
                  "& .MuiTab-root": {
                    fontSize: "0.75rem",
                    minWidth: "unset",
                    padding: "6px 12px",
                    "@media (min-width: 640px)": {
                      fontSize: "0.875rem",
                      padding: "6px 16px",
                    },
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 py-4 md:py-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-1">
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row">
          <div className="part1 w-full md:w-[70%] mb-4 md:mb-0">
            {proData?.length !== 0 && <HomeSliderV2 data={proData} />}
          </div>
          <div className="part2 w-full md:w-[30%] md:pl-5 flex flex-col gap-3 md:gap-5">
            {bannersToShow?.map((banner) => (
              <BannerBoxV2
                key={banner._id}
                data={banner}
                info={banner.align}
                link={`/product-details/${banner._id}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 md:px-0">
          <div className="freeshipping w-full md:w-4/5 m-auto p-4 md:p-8 border-2 border-primary flex flex-col md:flex-row items-center justify-between rounded-md text-primary mb-5 md:mb-7 text-center md:text-left">
            <div className="col1 flex items-center gap-2 md:gap-4 mb-3 md:mb-0">
              <FaShippingFast className="text-3xl md:text-5xl" />
              <span className="text-lg md:text-3xl font-semibold uppercase">
                Free Shipping
              </span>
            </div>
            <div className="col2 mb-3 md:mb-0">
              <p className="font-semibold text-sm md:text-lg">
                Free Delivery Now On Your First Order and over $200
              </p>
            </div>
            <div className="col3">
              <p className="font-bold text-xl md:text-3xl">- Only $200*</p>
            </div>
          </div>
          <AdsBannerSliderV2 items={4} />
        </div>
      </section>
      <section className="bg-white pt-0 pb-4 md:pb-0">
        <div className="container mx-auto px-4 md:px-0">
          <h3 className="text-xl md:text-3xl font-semibold mb-2">
            Latest Products
          </h3>
          {proData?.length !== 0 ? (
            <ProductSlider items={6} data={proData} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 py-4 md:py-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-1">
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          )}
          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="bg-white py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-0">
          <h3 className="text-xl md:text-3xl font-semibold mb-2">
            Featured Products
          </h3>
          {featuredProduct?.length !== 0 ? (
            <ProductSlider items={6} data={featuredProduct} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 py-4 md:py-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-1">
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          )}
          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="blogSection py-4 md:py-8">
        <div className="container mx-auto px-4 md:px-0">
          <h3 className="text-xl md:text-3xl font-semibold mb-2">
            From The Blog
          </h3>
          {blogs?.length !== 0 ? (
            <Swiper
              navigation={true}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              spaceBetween={15}
              modules={[Navigation]}
              className="blogSwiper"
            >
              {blogs?.map((blog) => (
                <SwiperSlide key={blog._id}>
                  <BlogItem data={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            "Blogs Not Available"
          )}
        </div>
      </section>
    </>
  );
};
