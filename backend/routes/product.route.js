import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  bannerImageController,
  createProduct,
  createProductRAMS,
  createProductSize,
  createProductWgt,
  deleteMultipleProduct,
  deleteProduct,
  deleteProductRams,
  deleteProductSize,
  deleteProductWgt,
  filters,
  getAllProductRams,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBySubCatId,
  getAllProductsBySubCatName,
  getAllProductsByThirdSubCatId,
  getAllProductsByThirdSubCatName,
  getAllProductSize,
  getAllProductWgt,
  getFeaturedProducts,
  getProductsCount,
  getSingleProduct,
  productImageController,
  removeImageFromCloudinary,
  sortBy,
  updateProduct,
  updateProductRam,
  updateProductSize,
  updateProductWgt,
} from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  productImageController
);
productRouter.post(
  "/uploadBannerImages",
  auth,
  upload.array("bannerImages"),
  bannerImageController
);
productRouter.post("/create", auth, createProduct);
productRouter.post("/rams/create", auth, createProductRAMS);
productRouter.post("/size/create", auth, createProductSize);
productRouter.post("/weight/create", auth, createProductWgt);

productRouter.get("/", getAllProducts);
productRouter.post("/filters", filters);
productRouter.post("/sortBy", sortBy);
productRouter.get("/rams/get", getAllProductRams);
productRouter.get("/size/get", getAllProductSize);
productRouter.get("/weight/get", getAllProductWgt);

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
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);

productRouter.delete("/deleteMultiple", auth, deleteMultipleProduct);

productRouter.delete("/:id", auth, deleteProduct);
productRouter.delete("/rams/:id", auth, deleteProductRams);
productRouter.delete("/size/:id", auth, deleteProductSize);
productRouter.delete("/weight/:id", auth, deleteProductWgt);

productRouter.get("/get/:id", getSingleProduct);

productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.put("/updateProductRam/:id", auth, updateProductRam);
productRouter.put("/updateProductSize/:id", auth, updateProductSize);
productRouter.put("/updateProductWeight/:id", auth, updateProductWgt);

export default productRouter;
