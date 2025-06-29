import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Header } from "./Components/Header";
import "../src/App.css";
import { Sidebar } from "./Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import Products from "./Pages/Products";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import { setIsOpenFullScreenPanel } from "./redux/slices/fullScreenPanelSlice";
import Button from "@mui/material/Button";
import AddProduct from "./Pages/Products/AddProduct";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function App() {
  const dispatch = useDispatch();
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const sideBarOpen = useSelector((state) => state.sidePanel.sidePanelOpen);
  const router = createBrowserRouter([
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`sidebarWrapper ${
                  sideBarOpen === true ? "w-[15%]" : "w-0"
                } transition-all duration-300 overflow-hidden`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight ${
                  sideBarOpen === true ? "w-[85%]" : "w-[100%]"
                }  py-4 px-5 transition-all duration-300`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`sidebarWrapper ${
                  sideBarOpen === true ? "w-[15%]" : "w-0"
                } transition-all duration-300 overflow-hidden`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight ${
                  sideBarOpen === true ? "w-[85%]" : "w-[100%]"
                }  py-4 px-5 transition-all duration-300`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/signin",
      exact: true,
      element: <Login />,
    },
    {
      path: "/signup",
      exact: true,
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => dispatch(setIsOpenFullScreenPanel({ open: false }))}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                dispatch(setIsOpenFullScreenPanel({ open: false }))
              }
              aria-label="close"
            >
              <IoClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">
                {isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {isOpenFullScreenPanel?.model === 'Add Product' && <AddProduct/>}
      </Dialog>
    </>
  );
}

export default App;
