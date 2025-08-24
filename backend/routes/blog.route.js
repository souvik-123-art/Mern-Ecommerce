import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  blogImageController,
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  removeImageFromCloudinary,
  updateBlog,
} from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.post(
  "/uploadImages",
  auth,
  upload.array("images"),
  blogImageController
);
blogRouter.post("/add", auth, createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
blogRouter.delete("/deleteBlog/:id", auth, deleteBlog);
blogRouter.put("/updateBlog/:id", auth, updateBlog);

export default blogRouter;
