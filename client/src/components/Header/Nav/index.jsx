
import React, { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown, TfiAngleRight } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";


export const Nav = () => {
  const catData = useSelector((state) => state.catData.catData);
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeThirdMenu, setActiveThirdMenu] = useState(null);

  const openCatPanel = () => {
    setIsOpenCatPanel(true);
  };

  const toggleSubmenu = (catId) => {
    if (activeSubmenu === catId) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(catId);
      setActiveThirdMenu(null);
    }
  };

  const toggleThirdMenu = (subCatId) => {
    if (activeThirdMenu === subCatId) {
      setActiveThirdMenu(null);
    } else {
      setActiveThirdMenu(subCatId);
    }
  };

  return (
    <>
      <nav className="bg-white text-gray-800 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <IconButton
              onClick={() => setMobileNavOpen(true)}
              className="!text-gray-700"
            >
              <RiMenu2Fill className="text-xl" />
            </IconButton>
          </div>

          {/* Full Navigation Links – shown on md and up */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <ul className="flex gap-8 items-center text-gray-700 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors duration-200 py-2 px-1 font-medium"
                >
                  Home
                </Link>
              </li>

              {catData?.length !== 0 &&
                catData?.map((cat) => (
                  <li className="relative group" key={cat?._id}>
                    <Link
                      to={`/product-listing?catId=${cat?._id}`}
                      className="hover:text-primary transition-colors duration-200 py-2 px-1 font-medium flex items-center"
                    >
                      {cat.name}
                      <TfiAngleDown className="text-xs ml-1" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-0 w-[800px] bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-5 grid grid-cols-3 gap-6 border border-gray-100">
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat) => (
                          <div key={subCat._id} className="relative">
                            <Link
                              to={`/product-listing?subCatId=${subCat?._id}`}
                              className="font-semibold text-gray-800 hover:text-primary mb-3 block text-sm uppercase tracking-wide"
                            >
                              {subCat.name}
                            </Link>

                            <ul className="space-y-2">
                              {subCat?.children?.length !== 0 &&
                                subCat?.children?.map((tSubCat) => (
                                  <li key={tSubCat._id}>
                                    <Link
                                      to={`/product-listing?thirdSubCatId=${tSubCat?._id}`}
                                      className="text-gray-600 hover:text-primary text-sm transition-colors duration-200 block py-1"
                                    >
                                      {tSubCat.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Right Text – hidden on small screens */}
          <div className="hidden md:flex items-center">
            <p className="text-sm font-medium flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full">
              <GoRocket className="text-lg" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileNavOpen}
        onClose={() => {
          setMobileNavOpen(false);
          setActiveSubmenu(null);
          setActiveThirdMenu(null);
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
          },
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <IconButton onClick={() => setMobileNavOpen(false)}>
              <AiOutlineClose />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Home
                </Link>
              </li>

              {catData?.length !== 0 &&
                catData?.map((cat) => (
                  <li
                    key={cat?._id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <div
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleSubmenu(cat._id)}
                    >
                      <span className="font-medium">{cat.name}</span>
                      {activeSubmenu === cat._id ? (
                        <TfiAngleDown className="text-xs" />
                      ) : (
                        <TfiAngleRight className="text-xs" />
                      )}
                    </div>

                    {/* Subcategories */}
                    {activeSubmenu === cat._id && (
                      <ul className="pl-6 py-2 bg-gray-50 rounded-lg mx-2 mb-2">
                        {cat?.children?.length !== 0 &&
                          cat?.children?.map((subCat) => (
                            <li key={subCat._id} className="mb-2 last:mb-0">
                              <div
                                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => toggleThirdMenu(subCat._id)}
                              >
                                <span className="text-sm font-medium">
                                  {subCat.name}
                                </span>
                                {subCat?.children?.length > 0 &&
                                  (activeThirdMenu === subCat._id ? (
                                    <TfiAngleDown className="text-xs" />
                                  ) : (
                                    <TfiAngleRight className="text-xs" />
                                  ))}
                              </div>

                              {/* Third level categories */}
                              {activeThirdMenu === subCat._id &&
                                subCat?.children?.length > 0 && (
                                  <ul className="pl-4 py-2 bg-gray-100 rounded-md mt-1">
                                    {subCat?.children?.map((tSubCat) => (
                                      <li key={tSubCat._id}>
                                        <Link
                                          to={`/product-listing?thirdSubCatId=${tSubCat?._id}`}
                                          className="flex items-center p-2 text-sm hover:text-primary transition-colors"
                                          onClick={() =>
                                            setMobileNavOpen(false)
                                          }
                                        >
                                          {tSubCat.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Free delivery notice at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <p className="text-sm font-medium flex items-center gap-2 text-primary justify-center bg-primary/10 px-3 py-2 rounded-lg">
              <GoRocket className="text-lg" />
              Free International Delivery
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
