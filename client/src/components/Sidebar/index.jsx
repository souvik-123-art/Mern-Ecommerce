import React, { useState } from "react";
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
export const Sidebar = () => {
  const [isCatOpen, setIsCatOpen] = useState(true);
  const [isAvaOpen, setIsAvaOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
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
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Fashion"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Electronics"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Bags"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Footwear"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Groceries"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Beauty"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Wellness"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Jewellery"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-3">
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
      </div>
      <div className="box mt-3">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Size
          <Button
            className="w-[30px] h-[30px] !ml-auto !min-w-[30px] !rounded-full !text-black !transition duration-300"
            onClick={() => setIsSizeOpen(!isSizeOpen)}
          >
            {isSizeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={isSizeOpen}>
          <div className="scroll px-5 relative -left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Small"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Medium"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Large"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="XL"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="XXL"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-4">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Filter By Size
        </h3>
        <RangeSlider />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong className="text-black">Rs: {100}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            From: <strong className="text-black">Rs: {5000}</strong>
          </span>
        </div>
      </div>
      <div className="box mt-4">
        <h3 className="mb-3 text-[18px] font-[500] flex items-center w-full pr-5">
          Rating
        </h3>
        <div className="box w-full">
          <Rating name="size-small" defaultValue={5} readOnly size="small" />
        </div>
        <div className="box w-full">
          <Rating name="size-small" defaultValue={4} readOnly size="small" />
        </div>
        <div className="box w-full">
          <Rating name="size-small" defaultValue={3} readOnly size="small" />
        </div>
        <div className="box w-full">
          <Rating name="size-small" defaultValue={2} readOnly size="small" />
        </div>
        <div className="box w-full">
          <Rating name="size-small" defaultValue={1} readOnly size="small" />
        </div>
      </div>
    </aside>
  );
};
