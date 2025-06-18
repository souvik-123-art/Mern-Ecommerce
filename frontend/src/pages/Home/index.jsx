import React from 'react'
import { HomeSlider } from '../../components/SwiperSlider'
import { HomeCatSlider } from '../../components/HomeCatSlider'
import { FaShippingFast } from "react-icons/fa";
import { AdsBannerSlider } from '../../components/AdsBannerSlider';
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ProductSlider } from '../../components/ProductSlider';
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
          <ProductSlider items={6}/>
        </div>
      </section>

      <section className="py-16 bg-white">
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
    </>
  );
}
