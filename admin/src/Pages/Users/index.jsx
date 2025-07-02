import React, { useState } from "react";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "userImage", label: "User Image", minWidth: 150 },
  { id: "userName", label: "User Name", minWidth: 100 },
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
    id: "userCreated",
    label: "Created",
    minWidth: 130,
  },
];
const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="card my-4 p-5 mt-5 shadow-md sm:rounded-lg bg-white overflow-hidden">
        <div className="flex items-center w-full mb-4">
          <div className="col w-[60%]">
            <h2 className="text-3xl font-bold">Users List</h2>
          </div>
          <div className="col w-[40%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
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
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[55px] h-[55px] rounded-full overflow-hidden">
                      <img
                        src="https://mui.com/static/images/avatar/1.jpg"
                        className="w-full"
                        alt=""
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Souvik Sarkar
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex">
                    <span>
                      <MdOutlineEmail className="text-xl mr-2" />
                    </span>
                    <span>example@gmail.com</span>
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex">
                    <span>
                      <MdOutlineCall className="text-xl mr-2" />
                    </span>
                    <span>9823456788</span>
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  20-05-2025
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Users;
