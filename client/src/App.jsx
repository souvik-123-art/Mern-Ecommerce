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
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { setUserDetails } from "./redux/Slices/userDetailsSlice";
function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        dispatch(setUserDetails(res.data));
        dispatch(setIsLogin(true));
      });
    } else {
      dispatch(setIsLogin(false));
    }
  }, [isLogin]);
  return (
    <>
      <BrowserRouter>
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
        </Routes>
        <ProductModal />
        <CartPanel />
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
