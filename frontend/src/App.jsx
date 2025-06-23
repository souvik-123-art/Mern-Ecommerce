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

function App() {
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
        </Routes>
        <ProductModal />
        <CartPanel/>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
