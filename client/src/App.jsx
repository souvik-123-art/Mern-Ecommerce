import { BrowserRouter, Route, Routes } from "react-router-dom";
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function App() {
  const dispatch = useDispatch();
  const isOpenFullScreenPanel = useSelector(
    (state) => state.fullScreenPanel.isOpenFullScreenPanel
  );
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        if (res?.response?.data?.message === "jwt expired") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("removetoken");
          toast.error("your session is expired. Login again");
          dispatch(setIsLogin(false));
        }
        dispatch(setUserDetails(res.data));
        dispatch(setIsLogin(true));
      });
    } else {
      dispatch(setIsLogin(false));
    }
  }, [isLogin]);

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
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route
            path="/product-listing"
            exact={true}
            element={<ProductListing />}
          />
          <Route
            path="/product-details/:id"
            exact={true}
            element={<ProductDetails />}
          />
          <Route path="/login" exact={true} element={<Login />} />
          <Route path="/register" exact={true} element={<SignUp />} />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route
            path="/forgot-password"
            exact={true}
            element={<ForgotPassword />}
          />
          <Route path="/verify-email" exact={true} element={<VerifyOTP />} />
          <Route
            path="/reset-password/:token"
            exact={true}
            element={<ResetPassword />}
          />
          <Route path="/checkout" exact={true} element={<Checkout />} />
          <Route path="/my-account" exact={true} element={<MyAccount />} />
          <Route path="/my-list" exact={true} element={<MyList />} />
          <Route path="/my-orders" exact={true} element={<Orders />} />
          <Route path="/address" exact={true} element={<Address />} />
        </Routes>
        <ProductModal />
        <CartPanel />
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
