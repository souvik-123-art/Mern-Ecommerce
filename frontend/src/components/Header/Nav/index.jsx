import Button from "@mui/material/Button";
import React, { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { CategoryPanel } from "./CategoryPanel";
export const Nav = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false)
  const openCatPanel = ()=>{
    setIsOpenCatPanel(true)
  }
  return (
    <>
      <nav className=" bg-gray-700 py-2">
        <div className="container mx-auto flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <Button
              onClick={openCatPanel}
              className="!text-gray-200 !gap-2 w-full !font-bold"
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <TfiAngleDown className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[65%]">
            <ul className="flex gap-5 items-center text-gray-200 font-[500] subnav">
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Home
                </Link>
              </li>
              <li className="relative">
                <Link to="/" className="link transition text-[14px]">
                  Fashion
                </Link>
                <div className="submenu absolute top-[130%] left-[0%] min-w-[200px] bg-white shadow-md transition-all">
                  <ul>
                    <li className="w-full relative">
                      <Link>
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          Men
                        </Button>
                      </Link>
                      <div className="submenu absolute !top-[30%]  min-w-[150px] bg-white shadow-xl transition-all">
                        <ul>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                T-shirts
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Jeans
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Footwear
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Watch
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Pants
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="w-full relative">
                      <Link>
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          Women
                        </Button>
                      </Link>
                      <div className="submenu absolute !top-[30%]  min-w-[150px] bg-white shadow-xl transition-all">
                        <ul>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                T-shirts
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Jeans
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Footwear
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Watch
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Pants
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="w-full relative">
                      <Link>
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          Kids
                        </Button>
                      </Link>
                      <div className="submenu absolute !top-[30%]  min-w-[150px] bg-white shadow-xl transition-all">
                        <ul>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Men
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Women
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Kids
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Boys
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Girls
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="w-full relative">
                      <Link>
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          Boys
                        </Button>
                      </Link>
                      <div className="submenu absolute !top-[30%] min-w-[150px] bg-white shadow-xl transition-all">
                        <ul>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Men
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Women
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Kids
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Boys
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Girls
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="w-full relative">
                      <Link>
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          Girls
                        </Button>
                      </Link>
                      <div className="submenu absolute !top-[30%] min-w-[150px] bg-white shadow-xl transition-all">
                        <ul>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Men
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Women
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Kids
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Boys
                              </Button>
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link>
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                Girls
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Bags
                </Link>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Groceries
                </Link>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Beauty
                </Link>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Wellness
                </Link>
              </li>
              <li>
                <Link to="/" className="link transition text-[14px]">
                  Jewellery
                </Link>
              </li>
            </ul>
          </div>
          <div className="col_3 w-[15%] flex items-center justify-end">
            <p className="text-[13px] font-[500] text-white flex items-center gap-3">
              <GoRocket className="text-lg animate-pulse" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};
