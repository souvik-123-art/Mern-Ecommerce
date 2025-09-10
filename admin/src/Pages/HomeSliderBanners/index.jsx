import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TooltipMUI from "@mui/material/Tooltip";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import { setIsOpenFullScreenPanel } from "../../redux/slices/fullScreenPanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { setLgBanners } from "../../redux/slices/HomeBannerSlice";
import CircularProgress from "@mui/material/CircularProgress";
const columns = [
  { id: "image", label: "Image", minWidth: 300 },
  { id: "action", label: "Action", minWidth: 100 },
];
const HomeSliderBanners = () => {
  const dispatch = useDispatch();
  const lgBanners = useSelector((state) => state.homeBannerData.lgBanners);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchDataFromApi("/api/homeBanners").then((res) => {
      setIsLoading(false);
      dispatch(setLgBanners(res?.data));
    });
  }, []);
  return (
    <>
      <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Home Slider Banners
        </h2>
        <div className="col w-full sm:ml-auto flex items-center gap-2 sm:gap-3 flex-wrap">
          <Button
            className="btn-blue btn !flex !items-center !gap-1 !text-xs sm:!text-sm !px-2 sm:!px-3 !py-1 sm:!py-2"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Home Slide",
                })
              )
            }
          >
            <FaPlus className="text-sm sm:text-base" />
            Add Home Slide
          </Button>
        </div>
      </div>

      <div className="card my-4 p-3 sm:p-4 md:p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden relative">
        <div
          className={`absolute inset-0 bg-white/40 ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center z-50 left-0 top-0`}
        >
          <CircularProgress className="!text-primary" />
        </div>
        {lgBanners?.length !== 0 ? (
          <>
            <div className="overflow-x-auto">
              <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          width={column.minWidth}
                          className="!whitespace-nowrap !text-xs sm:!text-sm"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lgBanners?.map((banner) => (
                      <TableRow key={banner._id}>
                        <TableCell width={200} className="!p-2 sm:!p-3">
                          <div className="flex items-center gap-2 sm:gap-4 w-full max-w-[200px] sm:max-w-[300px]">
                            <div className="img w-full rounded-md overflow-hidden">
                              <img
                                src={banner?.images}
                                className="w-full h-auto"
                                alt="Banner"
                              />
                            </div>
                          </div>
                        </TableCell>

                        <TableCell width={80} className="!p-2 sm:!p-3">
                          <TooltipMUI
                            title="Delete Banner Image"
                            placement="top"
                          >
                            <Button
                              onClick={() => {
                                setIsLoading(true);
                                deleteData(
                                  `/api/homeBanners/deleteLgHomeBanner/${banner._id}`,
                                  { credentials: true }
                                ).then((res) => {
                                  fetchDataFromApi("/api/homeBanners").then(
                                    (res) => {
                                      dispatch(setLgBanners(res?.data));
                                      setIsLoading(false);
                                    }
                                  );
                                });
                              }}
                              className="!w-6 !h-6 sm:!w-8 sm:!h-8 !min-w-0 !bg-red-500 !text-sm sm:!text-lg !text-[#f1f1f1] !rounded-full"
                            >
                              <RiDeleteBin6Line />
                            </Button>
                          </TooltipMUI>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        ) : (
          <div className="w-full h-40 flex items-center justify-center">
            <span className="text-base sm:text-xl font-light text-black/60 text-center px-4">
              No Banner Images Available
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSliderBanners;
