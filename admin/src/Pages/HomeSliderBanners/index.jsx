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
      <div className="py-3 flex items-center">
        <h2 className="text-3xl font-bold">Home Slider Banners</h2>
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
                  model: "Add Home Slide",
                })
              )
            }
          >
            <FaPlus />
            Add Home Slide
          </Button>
        </div>
      </div>

      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden relative">
        <div
          className={`absolute inset-0 bg-white/40 ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center z-50 left-0 top-0`}
        >
          <CircularProgress className="!text-primary" />
        </div>
        {lgBanners?.length !== 0 ? (
          <>
            <TableContainer sx={{ maxHeight: 640 }}>
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
                  {lgBanners?.map((banner) => (
                    <TableRow>
                      <TableCell width={300}>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-full rounded-md overflow-hidden">
                            <img
                              src={banner?.images}
                              className="w-full"
                              alt=""
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell width={100}>
                        {/* <TooltipMUI title="Edit Banner Image" placement="top">
                          <Button className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full">
                            <FiEdit2 className="text-lg" />
                          </Button>
                        </TooltipMUI> */}
                        <TooltipMUI title="Delete Banner Image" placement="top">
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
                            className="!w-8 !bg-red-500 !text-lg !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full"
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
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl font-light text-black/60">
              No Banner Images Available
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSliderBanners;
