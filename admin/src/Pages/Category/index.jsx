import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TooltipMUI from "@mui/material/Tooltip";
import Progress from "../../Components/ProgressBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import toast from "react-hot-toast";
import { setCatData } from "../../redux/slices/categoryDataSlice";
const columns = [
  { id: "catImage", label: "Category Image", minWidth: 100 },
  { id: "catName", label: "Category Name", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];
const CategoryList = () => {
  const dispatch = useDispatch();
  const catData = useSelector((state) => state.catData.catData);
  const removeCategory = (id) => {
    deleteData(`/api/category/deleteCategory/${id}`, {
      withCredentials: true,
    }).then((res) => {
      try {
        if (!res?.data.error) {
          toast.success(res?.data.message);
          fetchDataFromApi("/api/category").then((res) => {
            dispatch(setCatData(res?.data));
          });
        } else {
          toast.error(res?.data.message);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    });
  };
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      dispatch(setCatData(res?.data));
    });
  }, [isOpenFullScreenPanel]);

  return (
    <>
      <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <h2 className="text-3xl font-bold">Category List</h2>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <Button className="btn !bg-green-600 !text-white hover:!bg-green-400">
            Export
          </Button>
          <Button
            className="btn-blue btn !flex !items-center !gap-1"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Category",
                })
              )
            }
          >
            <FaPlus />
            Add Category
          </Button>
        </div>
      </div>

      <div className="card my-4 p-4 sm:p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-auto">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    width={column.minWidth}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {catData?.length !== 0 &&
                catData?.map((item, idx) => (
                  <TableRow key={item.name}>
                    <TableCell width={100}>
                      <div className="flex items-center gap-4 w-[50px]">
                        <div className="img w-full rounded-md overflow-hidden">
                          <img
                            src={item.images}
                            className="w-full h-auto object-cover"
                            alt="category"
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell width={100}>
                      <span>{item.name}</span>
                    </TableCell>

                    <TableCell width={100}>
                      <div className="flex gap-2 flex-wrap">
                        <TooltipMUI title="Edit Category" placement="top">
                          <Button
                            onClick={() =>
                              dispatch(
                                setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Category",
                                  id: item._id,
                                })
                              )
                            }
                            className="!w-8 !bg-green-500 !h-8 !min-w-8 !text-white !rounded-full"
                          >
                            <FiEdit2 className="text-lg" />
                          </Button>
                        </TooltipMUI>

                        <TooltipMUI title="Delete Category" placement="top">
                          <Button
                            onClick={() => removeCategory(item._id)}
                            className="!w-8 !bg-red-500 !h-8 !min-w-8 !text-white !rounded-full"
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </TooltipMUI>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CategoryList;
