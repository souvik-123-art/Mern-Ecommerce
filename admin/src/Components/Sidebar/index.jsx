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
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
export const Sidebar = () => {
  const dispatch = useDispatch();
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
      className={`sidebar fixed top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 overflow-hidden
    ${sideBarOpen ? "w-64 sm:w-[15%] py-4 px-4" : "w-0 opacity-0"}`}
    >
      {/* Logo */}
      <div className="py-4 w-full flex justify-center">
        <Link to="/">
          <img
            src="https://ecme-react.themenate.net/img/logo/logo-light-full.png"
            className="w-[100px] sm:w-[120px]"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="mt-4 flex flex-col gap-2">
        <li>
          <Link to="/">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]">
              <RxDashboard className="text-xl" />
              Dashboard
            </Button>
          </Link>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(1)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]"
          >
            <FaRegImage className="text-xl" />
            Home Slides
            <span className="ml-auto">
              <FaAngleDown
                className={`${
                  subMenuIndex === 1 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 1}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/homeSlider/list">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Home Banners List
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() =>
                    dispatch(
                      setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Home Slide",
                      })
                    )
                  }
                  className="!text-black/80 !capitalize !justify-start !w-full !text-sm !font-[400] !py-2 hover:!bg-[#f1f1f1] !pl-8"
                >
                  Add Home Banner Slide
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link to="/users">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]">
              <FiUsers className="text-xl" />
              Users
            </Button>
          </Link>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(3)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]"
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
          <Collapse isOpened={subMenuIndex === 3}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/products">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Product List
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() =>
                    dispatch(
                      setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    )
                  }
                  className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8"
                >
                  Product Upload
                </Button>
              </li>
              <li>
                <Link to="/product/addRams">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Add Product RAMS
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/product/addSize">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Add Product SIZE
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/product/addWeight">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Add Product WEIGHT
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(4)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]"
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
          <Collapse isOpened={subMenuIndex === 4}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/category/list">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Category List
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() =>
                    dispatch(
                      setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Category",
                      })
                    )
                  }
                  className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8"
                >
                  Add a Category
                </Button>
              </li>
              <li>
                <Link to="/subCategory/list">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Sub Category List
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() =>
                    dispatch(
                      setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Sub Category",
                      })
                    )
                  }
                  className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8"
                >
                  Add a Sub Category
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link to="/orders">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]">
              <BsBoxSeam className="text-xl" />
              Orders
            </Button>
          </Link>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(5)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]"
          >
            <BiCategoryAlt className="text-xl" />
            Banners
            <span className="ml-auto">
              <FaAngleDown
                className={`${
                  subMenuIndex === 5 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 5}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/bannerV1List">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Banner V1 List
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() =>
                    dispatch(
                      setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Banner V1",
                      })
                    )
                  }
                  className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8"
                >
                  Add Banner
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(6)}
            className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]"
          >
            <BiCategoryAlt className="text-xl" />
            Blogs
            <span className="ml-auto">
              <FaAngleDown
                className={`${
                  subMenuIndex === 6 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 6}>
            <ul className="ml-3 w-full border-l pr-3">
              <li>
                <Link to="/blogList">
                  <Button className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8">
                    Blog List
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() =>
                    dispatch(
                      setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Blog",
                      })
                    )
                  }
                  className="!text-black/80 !capitalize !justify-start !w-full !text-sm !py-2 hover:!bg-[#f1f1f1] !pl-8"
                >
                  Add Blog
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link to="/logout">
            <Button className="!w-full !justify-start !capitalize !flex !gap-3 !text-base sm:text-lg !text-black/80 !font-semibold !py-2 hover:!bg-[#f1f1f1]">
              <RiLogoutCircleRLine className="text-xl" />
              Logout
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
