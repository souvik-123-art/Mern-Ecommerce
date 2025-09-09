import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineEmail } from "react-icons/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchBox from "../../Components/SearchBox";
import { MdOutlineCall } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../redux/slices/userDetailsSlice";
import { fetchDataFromApi } from "../../utils/api";
const columns = [
  { id: "userImage", label: "User Image", minWidth: 150 },
  { id: "userName", label: "User Name", minWidth: 100 },
  { id: "userId", label: "User ID", minWidth: 100 },
  {
    id: "userEmail",
    label: "User Email",
    minWidth: 150,
  },
  {
    id: "userMobileNo",
    label: "User Mobile No",
    minWidth: 130,
  },
  {
    id: "userVerify",
    label: "User Verify",
    minWidth: 130,
  },
  {
    id: "userCreated",
    label: "Created",
    minWidth: 130,
  },
];
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.UserDetails.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState(users);

  useEffect(() => {
    fetchDataFromApi("/api/user/users").then((response) => {
      const filterdUsers = response?.data?.filter(
        (user) => user?.role === "USER"
      );
      setAllUsers(filterdUsers || []);
      dispatch(setUsers(filterdUsers || []));
    });
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredUsers = allUsers.filter(
        (user) =>
          user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.mobile?.toString().includes(searchQuery) ||
          user?._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.createdAt.includes(searchQuery)
      );
      dispatch(setUsers(filteredUsers));
    } else {
      dispatch(setUsers(allUsers));
    }
  }, [searchQuery, allUsers]);
  return (
    <>
      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center w-full mb-4">
          <div className="col w-[60%]">
            <h2 className="text-3xl font-bold">Users List</h2>
          </div>
          <div className="col w-[40%] ml-auto">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.length !== 0
                ? users?.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center gap-4 w-[70px]">
                          <div className="img w-[55px] h-[55px] rounded-full overflow-hidden">
                            <img
                              src={user?.avatar}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {user?.name}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {user?._id}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex">
                          <span>
                            <MdOutlineEmail className="text-xl mr-2" />
                          </span>
                          <span>{user?.email}</span>
                        </span>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex">
                          <span>
                            <MdOutlineCall className="text-xl mr-2" />
                          </span>
                          <span>+{user?.mobile || "none"}</span>
                        </span>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {user?.isVerified ? "verified" : "Not Verified"}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {new Date(user?.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                : "no users"}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Users;
