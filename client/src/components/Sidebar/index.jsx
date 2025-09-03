import React, { useEffect, useState } from "react";
import "../Sidebar/style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";
export const Sidebar = (props) => {
  const [isCatOpen, setIsCatOpen] = useState(true);
  const location = useLocation();
  const [isAvaOpen, setIsAvaOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const catData = useSelector((state) => state.catData.catData);
  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 5,
  });
  const [price, setPrice] = useState([0, 60000]);

  const handleCheckboxChange = (field, value) => {
    const currentVal = filters[field] || [];
    const updatedVal = currentVal?.includes(value)
      ? currentVal.filter((item) => item !== value)
      : [...currentVal, value];
    setFilters((prev) => ({
      ...prev,
      [field]: updatedVal,
    }));
    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdSubCatId: [],
      }));
    }
  };
  const filterData = () => {
    props?.setIsLoading(true);
    postData(`/api/product/filters`, filters).then((res) => {
      postData("/api/product/sortBy", {
        products: res?.products,
        sortBy: "name",
        order: "asc",
      }).then((response) => {
        props?.setProductsData(response?.products);
      });
      props?.setIsLoading(false);
      props?.setTotalPages(res?.totalPages);
      window.scrollTo(0, 0);
    });
  };
  useEffect(() => {
    const url = window.location.href;
    const queryParam = new URLSearchParams(location.search);
    if (url.includes("catId")) {
      const categoryId = queryParam.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
    }
    if (url.includes("subCatId")) {
      const categoryId = queryParam.get("subCatId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = [];
      filters.subCatId = catArr;
      filters.thirdSubCatId = [];
      filters.rating = [];
    }
    if (url.includes("thirdSubCatId")) {
      const categoryId = queryParam.get("thirdSubCatId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = [];
      filters.subCatId = [];
      filters.thirdSubCatId = catArr;
      filters.rating = [];
    }
    filters.page = 1;
    filterData();
  }, [location]);
  // useEffect(() => {
  //   filters.page = props.page;
  //   filterData();
  // }, [filters, props.page]);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: props.page,
    }));
  }, [props.page]);

  // whenever filters change, fetch products
  useEffect(() => {
    filterData();
  }, [filters]);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);
  return (
    <aside className="sidebar border border-[#dadada] p-5 rounded-md">
      <div className="box">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          CATEGORIES
          <Button
            className="w-[30px] h-[30px] !ml-auto !min-w-[30px] !rounded-full !text-black !transition duration-300"
            onClick={() => setIsCatOpen(!isCatOpen)}
          >
            {isCatOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={isCatOpen}>
          <div className="scroll px-5 relative -left-[10px]">
            {catData?.length !== 0 &&
              catData?.map((cat) => (
                <FormControlLabel
                  value={cat._id}
                  key={cat._id}
                  control={<Checkbox size="small" />}
                  label={cat.name}
                  checked={filters?.catId?.includes(cat?._id)}
                  onChange={() => handleCheckboxChange("catId", cat?._id)}
                  className="w-full"
                />
              ))}
          </div>
        </Collapse>
      </div>
      {/* <div className="box mt-3">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Availability
          <Button
            className="w-[30px] h-[30px] !ml-auto !min-w-[30px] !rounded-full !text-black !transition duration-300"
            onClick={() => setIsAvaOpen(!isAvaOpen)}
          >
            {isAvaOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={isAvaOpen}>
          <div className="scroll px-5 relative -left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available (17)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="In Stock (17)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Not Available (17)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div> */}
      <div className="box mt-4">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Filter By Size
        </h3>
        <RangeSlider
          value={price}
          onInput={setPrice}
          min={0}
          max={60000}
          step={5}
        />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong className="text-black">Rs: {price[0]}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            From: <strong className="text-black">Rs: {price[1]}</strong>
          </span>
        </div>
      </div>
      <div className="box mt-4">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Rating
        </h3>
        <div className="box w-full">
          <FormControlLabel
            control={<Checkbox size="small" />}
            value={5}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckboxChange("rating", 5)}
            label={
              <Rating
                name="size-small"
                defaultValue={5}
                readOnly
                size="small"
              />
            }
            className="w-full"
          />
        </div>
        <div className="box w-full">
          <FormControlLabel
            control={<Checkbox size="small" />}
            value={4.5}
            checked={filters?.rating?.includes(4.5)}
            onChange={() => handleCheckboxChange("rating", 4.5)}
            label={
              <Rating
                name="size-small"
                defaultValue={4.5}
                precision={0.5}
                readOnly
                size="small"
              />
            }
            className="w-full"
          />
        </div>
        <div className="box w-full">
          <FormControlLabel
            control={<Checkbox size="small" />}
            value={4}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckboxChange("rating", 4)}
            label={
              <Rating
                name="size-small"
                defaultValue={4}
                readOnly
                size="small"
              />
            }
            className="w-full"
          />
        </div>
        <div className="box w-full">
          <FormControlLabel
            control={<Checkbox size="small" />}
            value={3}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckboxChange("rating", 3)}
            label={
              <Rating
                name="size-small"
                defaultValue={3}
                readOnly
                size="small"
              />
            }
            className="w-full"
          />
        </div>
        <div className="box w-full">
          <FormControlLabel
            control={<Checkbox size="small" />}
            value={2}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckboxChange("rating", 2)}
            label={
              <Rating
                name="size-small"
                defaultValue={2}
                readOnly
                size="small"
              />
            }
            className="w-full"
          />
        </div>
        <div className="box w-full">
          <FormControlLabel
            control={<Checkbox size="small" />}
            value={1}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckboxChange("rating", 1)}
            label={
              <Rating
                name="size-small"
                defaultValue={1}
                readOnly
                size="small"
              />
            }
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
};
