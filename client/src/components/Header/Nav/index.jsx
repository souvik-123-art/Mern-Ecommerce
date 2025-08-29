import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { CategoryPanel } from "./CategoryPanel";
import { useDispatch, useSelector } from "react-redux";
export const Nav = () => {
  const catData = useSelector((state) => state.catData.catData);
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  // const [catData, setCatData] = useState([]);
  const openCatPanel = () => {
    setIsOpenCatPanel(true);
  };

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
              {catData?.length !== 0 &&
                catData?.map((cat) => (
                  <li className="relative" key={cat?._id}>
                    <Link
                      to={`/product-listing?catId=${cat?._id}`}
                      className="link transition text-[14px]"
                    >
                      {cat.name}
                    </Link>
                    <div className="submenu absolute top-[130%] left-[0%] min-w-[200px] bg-white shadow-md transition-all">
                      <ul>
                        {cat?.children?.length !== 0 &&
                          cat?.children?.map((subCat) => (
                            <li className="w-full relative" key={subCat._id}>
                              <Link
                                to={`/product-listing?subCatId=${subCat?._id}`}
                              >
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                  {subCat.name}
                                </Button>
                              </Link>
                              <div className="submenu absolute !top-[30%]  min-w-[150px] bg-white shadow-xl transition-all">
                                <ul>
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map((tSubCat) => (
                                      <li key={tSubCat._id} className="w-full">
                                        <Link
                                          to={`/product-listing?thirdSubCatId=${tSubCat?._id}`}
                                        >
                                          <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                                            {tSubCat.name}
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                ))}
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
      {catData?.length !== 0 && (
        <CategoryPanel
          isOpenCatPanel={isOpenCatPanel}
          setIsOpenCatPanel={setIsOpenCatPanel}
        />
      )}
    </>
  );
};
