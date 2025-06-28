import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaCartFlatbed } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const sideBarOpen = useSelector((state) => state.sidePanel.sidePanelOpen);
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      return setSubMenuIndex(null);
    }
    setSubMenuIndex(index);
  };
  return (
    <div
      className={`sidebar overflow-hidden ${
        sideBarOpen === true ? "w-[15%] py-2 px-4" : "w-0 opacity-0"
      } fixed top-0 left-0 bg-white h-full  shadow-xl z-20 transition-all duration-300`}
    >
      <div className="py-2 w-full">
        <Link to="/">
          <img
            src="https://ecme-react.themenate.net/img/logo/logo-light-full.png"
            className="w-[120px]"
            alt=""
          />
        </Link>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        <li>
          <Link to="/">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]">
              <RxDashboard className="text-xl" />
              Dashboard
            </Button>
          </Link>
        </li>
        <li>
          <Button
            onClick={() => isOpenSubMenu(1)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]"
          >
            <FaRegImage className="text-xl " />
            Home Slides
            <span className="ml-auto">
              <FaAngleDown
                className={`${
                  subMenuIndex === 1 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 1 ? true : false}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                  Home Banners List
                </Button>
              </li>
              <li>
                <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                  Add Home Banner Slide
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <Link to="/users">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]">
              <FiUsers className="text-xl" />
              Users
            </Button>
          </Link>
        </li>
        <li>
          <Button
            onClick={() => isOpenSubMenu(3)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]"
          >
            <FaCartFlatbed className="text-xl" />
            Products
            <span className="ml-auto">
              <FaAngleDown
                className={`${
                  subMenuIndex === 3 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 3 ? true : false}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/products">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                    Product List
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/product/upload">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                    Product Upload
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <Button
            onClick={() => isOpenSubMenu(4)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]"
          >
            <BiCategoryAlt className="text-xl" />
            Category
            <span className="ml-auto">
              <FaAngleDown
                className={`${
                  subMenuIndex === 4 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 4 ? true : false}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/categories">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                    Category List
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/category/add">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                    Add a Category
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/category/subCat">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                    Sub Category List
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/category/subCat/add">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-9 !font-['lexend']">
                    Add a Sub Category
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <Link to="/orders">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]">
              <BsBoxSeam className="text-xl" />
              Orders
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-lg !text-black/80 !font-semibold !font-['lexend'] !py-2 hover:!bg-[#f1f1f1]">
              <RiLogoutCircleRLine className="text-xl" />
              Logout
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
