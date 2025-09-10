import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProdWeight } from "../../redux/slices/productsDataSlice";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import CircularProgress from "@mui/material/CircularProgress";

const AddWeight = () => {
  const dispatch = useDispatch();
  const prodWgt = useSelector((state) => state.proData.prodWeight);
  const [wgt, setWgt] = useState("");
  const [editedWgt, setEditedWgt] = useState("");
  const [editModeId, setEditModeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (wgt === "") {
      toast.error("please add weight");
      return false;
    }
    postData("/api/product/weight/create", { wgt }, { credentials: true }).then(
      (res) => {
        try {
          if (!res?.error) {
            toast.success(res.message);
            fetchDataFromApi("/api/product/weight/get").then((response) => {
              dispatch(setProdWeight(response?.data));
            });
            setWgt("");
            setIsLoading(false);
          } else {
            toast.error(res.message);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    );
  };
  useEffect(() => {
    fetchDataFromApi("/api/product/weight/get").then((response) => {
      dispatch(setProdWeight(response?.data));
      setIsLoading(false);
    });
  }, [postData]);
  return (
    <>
      <div className="py-3 flex items-center">
        <h2 className="text-2xl md:text-3xl font-bold">Add Product WEIGHT</h2>
      </div>

      {/* Form Card */}
      <div className="card my-4 py-5 shadow-md sm:rounded-lg bg-white overflow-hidden w-full md:w-[80%] lg:w-[65%]">
        <form className="form py-2 p-4 sm:p-6" onSubmit={handleSubmit}>
          <div className="col">
            <h3 className="text-base md:text-lg font-medium mb-2">
              Product WEIGHT
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-black/30 outline-none 
                     focus:border-black/50 rounded-md px-3 text-sm"
              name="wgt"
              value={wgt}
              onChange={(e) => setWgt(e.target.value)}
            />
          </div>
          <Button type="submit" className="!p-3 btn-blue w-full !mt-6 sm:!mt-8">
            <BsCloudUpload className="mr-2 text-lg md:text-xl" />
            Publish & View
          </Button>
        </form>
      </div>

      {/* Table Card */}
      <div className="card my-4 py-5 shadow-md sm:rounded-lg bg-white overflow-hidden w-full md:w-[80%] lg:w-[65%]">
        <div className="relative overflow-x-auto mt-1 pb-5 h-[400px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border border-gray-100">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 w-[10%]"></th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 w-[60%] whitespace-nowrap"
                >
                  Product WEIGHT
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 w-[30%] whitespace-nowrap"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {prodWgt?.length !== 0 ? (
                prodWgt?.map((wgt) => (
                  <tr key={wgt._id} className="bg-white border border-gray-200">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {editModeId !== wgt._id ? (
                        <span className="text-primary">{wgt.wgt}</span>
                      ) : (
                        <input
                          type="text"
                          className="p-2 w-full focus:outline-none border border-black/30 focus:border-black/50 rounded-md"
                          name="wgt"
                          value={editedWgt}
                          onChange={(e) => setEditedWgt(e.target.value)}
                        />
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {editModeId !== wgt._id ? (
                        <div className="flex gap-2">
                          <Button
                            className="!min-w-[32px] !w-[32px] !h-[32px] sm:!min-w-[35px] sm:!w-[35px] sm:!h-[35px] 
                                   !rounded-full !text-black !text-base sm:!text-lg"
                            onClick={() => {
                              setEditModeId(wgt._id);
                              setEditedWgt(wgt.wgt);
                            }}
                          >
                            <FiEdit2 />
                          </Button>
                          <Button
                            onClick={() => {
                              deleteData(`/api/product/weight/${wgt._id}`).then(
                                (res) => {
                                  setIsLoading(true);
                                  fetchDataFromApi(
                                    "/api/product/weight/get"
                                  ).then((response) => {
                                    dispatch(setProdWeight(response?.data));
                                    toast.success(res.data.message);
                                    setIsLoading(false);
                                  });
                                }
                              );
                            }}
                            className="!min-w-[32px] !w-[32px] !h-[32px] sm:!min-w-[35px] sm:!w-[35px] sm:!h-[35px] 
                                   !rounded-full !text-black !text-base sm:!text-lg"
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            className="!min-w-[32px] !w-[32px] !h-[32px] sm:!min-w-[35px] sm:!w-[35px] sm:!h-[35px] 
                                   !rounded-full !text-black !text-base sm:!text-lg"
                            onClick={() => {
                              setIsLoading(true);
                              if (editedWgt === "") {
                                toast.error("Add product Weight");
                                setIsLoading(false);
                                return;
                              }
                              editData(
                                `/api/product/updateProductWeight/${wgt._id}`,
                                { wgt: editedWgt },
                                { credentials: true }
                              ).then((res) => {
                                fetchDataFromApi(
                                  "/api/product/weight/get"
                                ).then((response) => {
                                  setEditModeId(null);
                                  setIsLoading(false);
                                  dispatch(setProdWeight(response?.data));
                                  toast.success(res.data.message);
                                  setEditedWgt("");
                                });
                              });
                            }}
                          >
                            <TiTick />
                          </Button>
                          <Button
                            onClick={() => setEditModeId(null)}
                            className="!min-w-[32px] !w-[32px] !h-[32px] sm:!min-w-[35px] sm:!w-[35px] sm:!h-[35px] 
                                   !rounded-full !text-black !text-base sm:!text-lg"
                          >
                            <RxCross2 />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No WEIGHT Created Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Loader Overlay */}
          <div
            className={`absolute inset-0 bg-white/50 ${
              isLoading ? "flex" : "hidden"
            } justify-center items-center z-50`}
          >
            <CircularProgress className="!text-primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWeight;
