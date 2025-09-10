import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import { ProductListing } from "./pages/ProductListing";
import { Footer } from "./components/Footer";
import { ProductDetails } from "./pages/ProductDetails";
import ProductModal from "./components/ProductModal";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { CartPanel } from "./components/CartPanel";
import { Cart } from "./pages/Cart";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import toast, { Toaster } from "react-hot-toast";
import VerifyOTP from "./pages/VerifyOTP";
import { ResetPassword } from "./pages/ResetPassword";
import { Checkout } from "./pages/Checkout";
import { MyAccount } from "./pages/MyAccount";
import { MyList } from "./pages/MyList";
import { Orders } from "./pages/Orders";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "./redux/Slices/authSlice";
import React, { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { setUserDetails } from "./redux/Slices/userDetailsSlice";
import Address from "./pages/Address";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { IoClose } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import { setIsOpenFullScreenPanel } from "./redux/Slices/fullScreenPanelSlice";
import Slide from "@mui/material/Slide";
import AddAddress from "./pages/Address/AddAddress";
import { setBannerV1, setLgBanners } from "./redux/Slices/HomeBannerSlice";
import { setCatData } from "./redux/Slices/categoryDataSlice";
import { setBlogData } from "./redux/Slices/blogSlice";
import ScrollToTop from "./utils/windowScroll";
import { setCartData } from "./redux/Slices/cartSlice";
import { setMyListData } from "./redux/Slices/myListSlice";
import { setAddress } from "./redux/slices/userAddressSlice";
import { setOrderData } from "./redux/Slices/orderSlice";
import { SearchPage } from "./pages/SearchPage";
import { CircularProgress } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RedirectAuthenticatedUser = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  if (isLogin && userDetails?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  const dispatch = useDispatch();
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const [loading, setLoading] = React.useState(true);
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      fetchDataFromApi(`/api/user/user-details`)
        .then((res) => {
          if (res?.response?.data?.message === "jwt expired") {
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("removetoken");
            toast.error("your session is expired. Login again");
            dispatch(setUserDetails([]));
            dispatch(setIsLogin(false));
          } else {
            dispatch(setUserDetails(res.data));
            dispatch(setIsLogin(true));
          }
        })
        .finally(() => setLoading(false));
    } else {
      dispatch(setUserDetails([]));
      dispatch(setIsLogin(false));
      setLoading(false);
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/api/category"),
      fetchDataFromApi("/api/homeBanners"),
      fetchDataFromApi("/api/bannerV1"),
      fetchDataFromApi("/api/blog"),
    ])
      .then(([catRes, bannerRes, bannerV1Res, blogRes]) => {
        dispatch(setCatData(catRes?.data));
        dispatch(setLgBanners(bannerRes?.data));
        dispatch(setBannerV1(bannerV1Res?.data));
        dispatch(setBlogData(blogRes?.data));
      })
      .catch((error) => {
        console.error("Error fetching public data:", error);
      });

    if (isLogin) {
      Promise.all([
        fetchDataFromApi("/api/cart"),
        fetchDataFromApi("/api/myList"),
        fetchDataFromApi("/api/address"),
        fetchDataFromApi("/api/order"),
      ])
        .then(([cartRes, myListRes, addRes, orderRes]) => {
          dispatch(setCartData(cartRes?.data || []));
          dispatch(setMyListData(myListRes?.data || []));
          dispatch(setAddress(addRes?.data || []));
          dispatch(setOrderData(orderRes?.data || []));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      dispatch(setCartData([]));
      dispatch(setMyListData([]));
    }
  }, [dispatch, isLogin]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress className="!text-primary" />
      </div>
    );
  }
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <CartPanel />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route
            path="/product-listing"
            exact={true}
            element={<ProductListing />}
          />
          <Route path="/search" exact={true} element={<SearchPage />} />
          <Route
            path="/product-details/:id"
            exact={true}
            element={<ProductDetails />}
          />
          <Route
            path="/login"
            exact={true}
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/register"
            exact={true}
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/forgot-password"
            exact={true}
            element={
              <RedirectAuthenticatedUser>
                <ForgotPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            exact={true}
            element={
              <RedirectAuthenticatedUser>
                <VerifyOTP />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            exact={true}
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/checkout" exact={true} element={<Checkout />} />
          <Route path="/my-account" exact={true} element={<MyAccount />} />
          <Route path="/my-list" exact={true} element={<MyList />} />
          <Route path="/my-orders" exact={true} element={<Orders />} />
          <Route path="/address" exact={true} element={<Address />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
        <ProductModal />
        <Footer />
        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() => dispatch(setIsOpenFullScreenPanel({ open: false }))}
          slots={{
            transition: Transition,
          }}
        >
          <AppBar
            className="!bg-gray-800 !shadow-md"
            sx={{ position: "relative" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  dispatch(setIsOpenFullScreenPanel({ open: false }))
                }
                aria-label="close"
              >
                <IoClose className="text-white link" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-white">
                  {isOpenFullScreenPanel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
        </Dialog>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
