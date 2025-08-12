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
import { setProdSize } from "../../redux/slices/productsDataSlice";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import CircularProgress from "@mui/material/CircularProgress";

const AddSize = () => {
  const dispatch = useDispatch();
  const prodSize = useSelector((state) => state.proData.prodSize);
  const [size, setSize] = useState("");
  const [editedSize, setEditedSize] = useState("");
  const [editModeId, setEditModeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (size === "") {
      toast.error("please add size");
      return false;
    }
    postData("/api/product/size/create", { size }, { credentials: true }).then(
      (res) => {
        try {
          if (!res?.error) {
            toast.success(res.message);
            fetchDataFromApi("/api/product/size/get").then((response) => {
              dispatch(setProdSize(response?.data));
            });
            setSize("");
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
    fetchDataFromApi("/api/product/size/get").then((response) => {
      dispatch(setProdSize(response?.data));
      setIsLoading(false);
    });
  }, [postData]);
  return (
    <>
      <div className="py-3 flex items-center">
        <h2 className="text-3xl font-bold">Add Product SIZE</h2>
      </div>
      <div className="card my-4 py-5 shadow-md sm:rounded-lg bg-white overflow-hidden w-[65%]">
        <form className="form py-2 p-6 " onSubmit={handleSubmit}>
          <div className="col">
            <h3 className="text-lg font-[500] mb-1">Product SIZE</h3>
            <input
              type="text"
              className="w-full h-[40px] border border-black/30 outline-none focus:border-black/50 rounded-md p-3 text-sm"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <Button type="submit" className=" !p-3 btn-blue w-full !mt-8">
            <BsCloudUpload className="mr-2 text-xl" />
            Publish & View
          </Button>
        </form>
      </div>
      <div className="card my-4 py-5 shadow-md sm:rounded-lg bg-white overflow-hidden w-[65%]">
        <div className="relative overflow-x-auto mt-1 pb-5  h-[400px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3" width="10%"></th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap"
                  width="60%"
                >
                  Product SIZE
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap"
                  width="30%"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {prodSize?.length !== 0 ? (
                prodSize?.map((size) => (
                  <>
                    <tr className="bg-white border border-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editModeId !== size._id ? (
                          <span className="text-primary">{size.size}</span>
                        ) : (
                          <input
                            type="text"
                            className="p-2 focus:outline-none border border-black/30 focus:border-black/50"
                            name="size"
                            value={editedSize}
                            onChange={(e) => setEditedSize(e.target.value)}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editModeId !== size._id ? (
                          // View mode
                          <div className="flex gap-2">
                            <Button
                              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg "
                              onClick={() => {
                                setEditModeId(size._id);
                              }}
                            >
                              <FiEdit2 />
                            </Button>
                            <Button
                              onClick={() => {
                                deleteData(`/api/product/size/${size._id}`).then(
                                  (res) => {
                                    setIsLoading(true);
                                    fetchDataFromApi(
                                      "/api/product/size/get"
                                    ).then((response) => {
                                      dispatch(setProdSize(response?.data));
                                      toast.success(res.data.message);
                                      setIsLoading(false);
                                    });
                                  }
                                );
                              }}
                              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg "
                            >
                              <RiDeleteBin6Line />
                            </Button>
                          </div>
                        ) : (
                          // Edit mode
                          <div className="flex gap-2">
                            <Button
                              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg "
                              onClick={() => {
                                setIsLoading(true);
                                if (editedSize === "") {
                                  toast.error("add product SIZE");
                                  setIsLoading(false);
                                  return;
                                }
                                editData(
                                  `/api/product/updateProductSize/${size._id}`,
                                  { size: editedSize },
                                  { credentials: true }
                                ).then((res) => {
                                  fetchDataFromApi(
                                    "/api/product/size/get"
                                  ).then((response) => {
                                    setEditModeId(null);
                                    setIsLoading(false);
                                    dispatch(setProdSize(response?.data));
                                    toast.success(res.data.message);
                                    setEditedSize("");
                                  });
                                });
                              }}
                            >
                              <TiTick />
                            </Button>
                            <Button
                              onClick={() => setEditModeId(null)}
                              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !text-lg "
                            >
                              <RxCross2 />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                    <div
                      className={`absolute bg-white/50 inset-0 ${
                        isLoading ? "flex" : "hidden"
                      } justify-center items-center z-50 left-0 top-0`}
                    >
                      <CircularProgress className="!text-primary" />
                    </div>
                  </>
                ))
              ) : (
                <>
                  <div
                    className={`absolute inset-0 bg-white 
                ${
                  isLoading ? "flex" : "hidden"
                } justify-center items-center z-50 left-0 top-0`}
                  >
                    <CircularProgress className="!text-primary" />
                  </div>
                  <tr>
                    <td width="10%" className="whitespace-nowrap"></td>
                    <td width="60%" className="whitespace-nowrap p-4">
                      <span>No SIZE Created Yet</span>
                    </td>
                    <td width="30%" className="whitespace-nowrap"></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddSize;
