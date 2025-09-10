import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Blogs</h2>
        <div className="flex items-center gap-3">
          <Button
            variant="contained"
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-4 !py-2 !rounded-lg !normal-case !flex !items-center !gap-2 !shadow-sm"
            onClick={() =>
              dispatch(
                setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Blog",
                })
              )
            }
          >
            <FaPlus className="text-sm" />
            Add Blog
          </Button>
        </div>
      </div>

      <div className="card my-4 p-4 sm:p-6 mt-5 shadow-sm sm:rounded-lg bg-white overflow-hidden relative border border-gray-100">
        <div
          className={`absolute inset-0 bg-white/80 ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center z-50 left-0 top-0 rounded-lg`}
        >
          <CircularProgress className="!text-primary" />
        </div>

        {blogs?.length !== 0 ? (
          <>
            <div className="overflow-x-auto">
              <TableContainer sx={{ maxHeight: { xs: 440, sm: 640 } }}>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            width: column.minWidth,
                            fontWeight: "bold",
                            backgroundColor: "#f9fafb",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogs?.map((blog) => (
                      <TableRow
                        key={blog?._id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f8f9fa",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            width: { xs: 120, sm: 200 },
                            padding: { xs: "8px", sm: "16px" },
                          }}
                        >
                          <div className="flex items-center">
                            <div className="img rounded-md overflow-hidden w-16 h-16 sm:w-20 sm:h-20">
                              <img
                                src={blog?.images[0]}
                                className="w-full h-full object-cover"
                                alt={blog.title}
                              />
                            </div>
                          </div>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            padding: { xs: "8px", sm: "16px" },
                          }}
                        >
                          <span className="font-medium line-clamp-2">
                            {blog.title}
                          </span>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            padding: { xs: "8px", sm: "16px" },
                          }}
                        >
                          <p className="line-clamp-2 text-gray-600">
                            {blog.description}
                          </p>
                        </TableCell>

                        <TableCell
                          sx={{
                            width: { xs: 100, sm: 120 },
                            padding: { xs: "8px", sm: "16px" },
                          }}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <Tooltip title="Edit Blog" placement="top">
                              <IconButton
                                onClick={() =>
                                  dispatch(
                                    setIsOpenFullScreenPanel({
                                      open: true,
                                      model: "Edit Blog",
                                      id: blog._id,
                                    })
                                  )
                                }
                                size="small"
                                className="!bg-green-100 hover:!bg-green-200 !text-green-700"
                              >
                                <FiEdit2 className="text-sm" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Blog" placement="top">
                              <IconButton
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this blog?"
                                    )
                                  ) {
                                    setIsLoading(true);
                                    deleteData(
                                      `/api/blog/deleteBlog/${blog._id}`,
                                      {
                                        credentials: true,
                                      }
                                    ).then((res) => {
                                      fetchDataFromApi("/api/blog").then(
                                        (res) => {
                                          dispatch(setBlogData(res?.data));
                                          setIsLoading(false);
                                        }
                                      );
                                    });
                                  }
                                }}
                                size="small"
                                className="!bg-red-100 hover:!bg-red-200 !text-red-700"
                              >
                                <RiDeleteBin6Line className="text-sm" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        ) : (
          <div className="w-full h-64 flex flex-col items-center justify-center text-center p-4">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-500 mb-2">
              No Blogs Available
            </span>
            <p className="text-gray-400 mb-4">
              Get started by creating your first blog post
            </p>
            <Button
              variant="contained"
              className="!bg-blue-600 hover:!bg-blue-700 !text-white"
              onClick={() =>
                dispatch(
                  setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add Blog",
                  })
                )
              }
            >
              Create Your First Blog
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
