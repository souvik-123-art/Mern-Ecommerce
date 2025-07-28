import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
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
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
import AddCategory from "./Pages/Category/AddCategory";
import CategoryList from "./Pages/Category";
import SubCategoryList from "./Pages/Category/SubCatList";
import AddSubCategory from "./Pages/Category/AddSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import { ForgotPassword } from "./Pages/ForgotPasswordPage";
import VerifyOTP from "./Pages/VerifyOTP";
import { ResetPassword } from "./Pages/ResetPassword";
import { setUserDetails } from "./redux/slices/userDetailsSlice";
import { setIsLogin } from "./redux/slices/authSlice";
import { fetchDataFromApi } from "./utils/api";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import Profile from "./Pages/Profile/index.jsx";
import toast from "react-hot-toast";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const sideBarOpen = useSelector((state) => state.sidePanel.sidePanelOpen);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        if (res?.response?.data?.message === "jwt expired") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("removetoken");
          toast.error("your session is expired. Login again");
        }
        dispatch(setUserDetails(res.data));
        dispatch(setIsLogin(true));
      });
    } else {
      dispatch(setIsLogin(false));
    }
  }, [isLogin]);
  const router = createBrowserRouter([
    {
      path: "/products",
      exact: true,
      element: (
        <ProtectedRoute>
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
        </ProtectedRoute>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <ProtectedRoute>
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
                <SubCategoryList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <ProtectedRoute>
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
                <CategoryList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <ProtectedRoute>
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
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <ProtectedRoute>
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
                <Users />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <ProtectedRoute>
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
                <Profile />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/Orders",
      exact: true,
      element: (
        <ProtectedRoute>
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
                <Orders />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      exact: true,
      element: (
        <ProtectedRoute>
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
        </ProtectedRoute>
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
    {
      path: "/forgot-password",
      exact: true,
      element: <ForgotPassword />,
    },
    {
      path: "/verify-email",
      exact: true,
      element: <VerifyOTP />,
    },
    {
      path: "/reset-password/:token",
      exact: true,
      element: <ResetPassword />,
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
        {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
        {isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />}
        {isOpenFullScreenPanel?.model === "Add Category" && <AddCategory />}
        {isOpenFullScreenPanel?.model === "Add Sub Category" && (
          <AddSubCategory />
        )}
      </Dialog>
    </>
  );
}

export default App;
