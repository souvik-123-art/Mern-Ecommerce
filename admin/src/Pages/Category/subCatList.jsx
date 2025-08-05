import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
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
      <div className="py-3 flex items-center">
        <h2 className="text-3xl font-bold">Sub Category List</h2>
        <div className="col ml-auto flex items-center gap-3">
          <Button className="btn !bg-green-600 !text-white hover:!bg-green-400">
            Export
          </Button>
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

      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        {catData?.length !== 0 && (
          <ul className="w-full">
            {catData?.map((cat, idx) => (
              <li className="w-full mb-1" key={cat.name}>
                <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                  <span className="font-[500] flex items-center gap-4 text-lg">
                    {cat.name}
                  </span>
                  <Button
                    onClick={() => expand(idx)}
                    className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg !ml-auto"
                  >
                    {isOpen === idx ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </div>
                {isOpen === idx && (
                  <>
                    {cat?.children?.length !== 0 && (
                      <ul className="w-full">
                        {cat?.children?.map((subCat, sIdx) => (
                          <li key={subCat.name} className="w-full py-1">
                            <EditSubCat
                              name={subCat.name}
                              id={subCat?._id}
                              catData={catData}
                              index={sIdx}
                              selectedCat={subCat?.parentId}
                              selectedCatName={subCat?.parentCatName}
                            />
                            {subCat?.children?.length !== 0 && (
                              <ul className="pl-4 pr-4">
                                {subCat?.children?.map((tSubCat, tSIdx) => (
                                  <li
                                    key={tSubCat.name}
                                    className="w-full hover:bg-[#f1f1f1]"
                                  >
                                    <EditSubCat
                                      name={tSubCat.name}
                                      id={tSubCat?._id}
                                      catData={cat?.children}
                                      index={tSIdx}
                                      selectedCat={tSubCat?.parentId}
                                      selectedCatName={tSubCat?.parentCatName}
                                    />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
