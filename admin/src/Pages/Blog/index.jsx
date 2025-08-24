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
import CircularProgress from "@mui/material/CircularProgress";
import { setBlogData } from "../../redux/slices/blogSlice";
const columns = [
  { id: "image", label: "Image", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 300 },
  { id: "description", label: "Description", minWidth: 400 },
  { id: "action", label: "Action", minWidth: 200 },
];
const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogData.blogData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchDataFromApi("/api/blog").then((res) => {
      setIsLoading(false);
      dispatch(setBlogData(res?.data));
    });
  }, []);
  return (
    <>
      <div className="py-3 flex items-center">
        <h2 className="text-3xl font-bold">Blogs</h2>
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
                  model: "Add Blog",
                })
              )
            }
          >
            <FaPlus />
            Add Blog
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
        {blogs?.length !== 0 ? (
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
                  {blogs?.map((blog) => (
                    <TableRow key={blog?._id}>
                      <TableCell width={200}>
                        <div className="flex items-center w-[200px]">
                          <div className="img w-full rounded-md overflow-hidden">
                            <img
                              src={blog?.images[0]}
                              className="w-full"
                              alt=""
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="!text-[15px]" width={100}>
                        {blog.title}
                      </TableCell>
                      <TableCell className="!text-[15px] " width={100}>
                        <p className="line-clamp-2">{blog.description}</p>
                      </TableCell>
                      <TableCell width={100}>
                        <TooltipMUI title="Edit Blog" placement="top">
                          <Button
                            onClick={() =>
                              dispatch(
                                setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Blog",
                                  id: blog._id,
                                })
                              )
                            }
                            className="!w-8 !bg-green-500 !mr-2 !h-8 !min-w-8 !text-[#f1f1f1] !rounded-full"
                          >
                            <FiEdit2 className="text-lg" />
                          </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Delete Blog" placement="top">
                          <Button
                            onClick={() => {
                              setIsLoading(true);
                              deleteData(`/api/blog/deleteBlog/${blog._id}`, {
                                credentials: true,
                              }).then((res) => {
                                fetchDataFromApi("/api/blog").then((res) => {
                                  dispatch(setBlogData(res?.data));
                                  setIsLoading(false);
                                });
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
              No Blogs Available
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
