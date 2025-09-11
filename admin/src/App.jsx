import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Header } from "./Components/Header";
import "../src/App.css";
import { Sidebar } from "./Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import Products from "./Pages/Products";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import BannerV1List from "./Pages/Banners";
import CategoryList from "./Pages/Category";
import SubCategoryList from "./Pages/Category/subCatList.jsx";
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
import ProductDetails from "./Pages/Products/ProductDetails.jsx";
import AddRams from "./Pages/Products/addRams.jsx";
import AddSize from "./Pages/Products/addSize.jsx";
import AddWeight from "./Pages/Products/addWeight.jsx";
import { setCatData } from "./redux/slices/categoryDataSlice.js";
import BlogList from "./Pages/Blog/index.jsx";
import { setOrderData, setOrdersCount } from "./redux/slices/orderSlice.js";

const RedirectAuthenticatedUser = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  if (isLogin && userDetails?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
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
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      dispatch(setCatData(res?.data));
    });
  }, []);
  useEffect(() => {
    fetchDataFromApi("/api/order/orderList").then((res) => {
      dispatch(setOrderData(res?.data));
      dispatch(setOrdersCount(res?.totalOrder));
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/products",

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
      path: "/bannerV1List",

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
                <BannerV1List />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/blogList",

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
                <BlogList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",

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
      path: "/product/addSize",

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
                <AddSize />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/addWeight",

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
                <AddWeight />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/addRams",

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
                <AddRams />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:id",

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
                <ProductDetails />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",

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

      element: (
        <RedirectAuthenticatedUser>
          <Login />
        </RedirectAuthenticatedUser>
      ),
    },
    {
      path: "/signup",

      element: (
        <RedirectAuthenticatedUser>
          <SignUp />
        </RedirectAuthenticatedUser>
      ),
    },
    {
      path: "/forgot-password",

      element: (
        <RedirectAuthenticatedUser>
          <ForgotPassword />
        </RedirectAuthenticatedUser>
      ),
    },
    {
      path: "/verify-email",

      element: (
        <RedirectAuthenticatedUser>
          <VerifyOTP />
        </RedirectAuthenticatedUser>
      ),
    },
    {
      path: "/reset-password/:token",

      element: (
        <RedirectAuthenticatedUser>
          <ResetPassword />
        </RedirectAuthenticatedUser>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
