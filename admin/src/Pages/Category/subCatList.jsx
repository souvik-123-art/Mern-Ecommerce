import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from "../../utils/api";
import { setCatData } from "../../redux/slices/categoryDataSlice";
import EditSubCat from "./EditSubCat";
const SubCategoryList = () => {
  const dispatch = useDispatch();
  const catData = useSelector((state) => state.catData.catData);
  const [isOpen, setIsOpen] = useState(0);
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      dispatch(setCatData(res?.data));
    });
  }, []);
  const expand = (idx) => {
    if (isOpen === idx) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(idx);
    }
  };
  return (
    <>
      <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold">Sub Category List</h2>

        <div className="ml-auto flex flex-wrap gap-3">
          <Button
            className="btn-blue btn !flex !items-center !gap-1"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Sub Category",
                })
              )
            }
          >
            <FaPlus />
            Add Sub Category
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mt-6">
        {catData?.length !== 0 ? (
          <div className="space-y-3">
            {catData?.map((cat, idx) => (
              <div
                key={cat._id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800 text-base sm:text-lg">
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      {cat?.children?.length || 0} subcategories
                    </span>
                  </div>

                  <IconButton
                    onClick={() => expand(idx)}
                    size="small"
                    className="!text-gray-600 hover:!bg-gray-200"
                    aria-label={isOpen === idx ? "Collapse" : "Expand"}
                  >
                    {isOpen === idx ? <FaAngleUp /> : <FaAngleDown />}
                  </IconButton>
                </div>

                {/* Subcategories Content */}
                {isOpen === idx && (
                  <div className="bg-white p-4 border-t border-gray-100">
                    {cat?.children?.length !== 0 ? (
                      <div className="space-y-4">
                        {cat?.children?.map((subCat, sIdx) => (
                          <div
                            key={subCat._id}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            {/* Subcategory Header */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-5 bg-blue-400 rounded-full"></div>
                                <span className="font-medium text-gray-800">
                                  {subCat.name}
                                </span>
                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                  {subCat?.children?.length || 0} child
                                  categories
                                </span>
                              </div>
                            </div>

                            {/* Edit Subcategory Component */}
                            <EditSubCat
                              name={subCat.name}
                              id={subCat?._id}
                              catData={catData}
                              index={sIdx}
                              selectedCat={subCat?.parentId}
                              selectedCatName={subCat?.parentCatName}
                            />

                            {/* Third-level Categories */}
                            {subCat?.children?.length !== 0 && (
                              <div className="mt-4 pl-6 sm:pl-8 space-y-3">
                                {subCat?.children?.map((tSubCat, tSIdx) => (
                                  <div
                                    key={tSubCat._id}
                                    className="bg-white rounded-md p-3 border border-gray-200"
                                  >
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="w-2 h-4 bg-blue-300 rounded-full"></div>
                                      <span className="text-sm font-medium text-gray-700">
                                        {tSubCat.name}
                                      </span>
                                    </div>

                                    <EditSubCat
                                      name={tSubCat.name}
                                      id={tSubCat?._id}
                                      catData={cat?.children}
                                      index={tSIdx}
                                      selectedCat={tSubCat?.parentId}
                                      selectedCatName={tSubCat?.parentCatName}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-300 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-sm">No subcategories found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No categories available
            </h3>
            <p className="text-sm">Start by creating your first category</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
