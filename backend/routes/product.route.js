import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBySubCatId,
  getAllProductsBySubCatName,
  getAllProductsByThirdSubCatId,
  getAllProductsByThirdSubCatName,
  getFeaturedProducts,
  getProductsCount,
  getSingleProduct,
  productImageController,
  removeImageFromCloudinary,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  productImageController
);
productRouter.post("/create", auth, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/category/:id", getAllProductsByCatId);
productRouter.get("/subCategory/:id", getAllProductsBySubCatId);
productRouter.get("/thirdSubCategory/:id", getAllProductsByThirdSubCatId);
productRouter.get("/thirdSubCategory", getAllProductsByThirdSubCatName);
productRouter.get("/category", getAllProductsByCatName);
productRouter.get("/subCategory", getAllProductsBySubCatName);
productRouter.get("/filterByPrice", getAllProductsByPrice);
productRouter.get("/productRating", getAllProductsByRating);
productRouter.get("/productsCount", getProductsCount);
productRouter.get("/featuredProducts", getFeaturedProducts);
productRouter.delete("/:id", auth, deleteProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.put("/updateProduct/:id", auth, updateProduct);

export default productRouter;
