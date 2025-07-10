import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  categoryImageController,
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesCount,
  getCategory,
  getSubCategoriesCount,
  removeImageFromCloudinary,
  updateCategory,
} from "../controllers/category.controller.js";
const categoryRouter = Router();

categoryRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  categoryImageController
);
categoryRouter.post("/create", auth, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/get/count", getCategoriesCount);
categoryRouter.get("/get/count/subCat", getSubCategoriesCount);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
categoryRouter.delete("/deleteCategory/:id", auth, deleteCategory);
categoryRouter.put("/updateCategory/:id", auth, updateCategory);

export default categoryRouter;
