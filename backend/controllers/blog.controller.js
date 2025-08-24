import blogModel from "../models/blog.model.js";
import UserModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload
let imagesArr = [];
export const blogImageController = async (req, res) => {
  try {
    imagesArr = [];
    const image = req.files;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };
    for (let i = 0; i < req?.files?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        (error, result) => {
          console.log(result);
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`backend/uploads/${req.files[i].filename}`);
          console.log(req.files[i].filename);
        }
      );
    }

    return res.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    let blog = new blogModel({
      title: req.body.title,
      images: req.body.images,
      description: req.body.description,
    });
    if (!blog) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
    blog = await blog.save();
    imagesArr = [];
    return res.status(200).json({
      message: "blog created",
      error: false,
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    return res.status(200).json({
      error: false,
      success: true,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(500).json({
        message: "The blog with the given id was not found.",
        error: true,
        success: false,
      });
    }

    res.send({
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const removeImageFromCloudinary = async (req, res) => {
  const userId = req.userId;
  const imgUrl = req.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      message: "you nedd to login",
      error: true,
      success: false,
    });
  }

  const imageName = image.split(".")[0];

  if (imageName) {
    const result = await cloudinary.uploader.destroy(imageName);
    if (result) {
      return res.status(200).send(result);
    }
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    const images = blog.images;
    for (let img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
      }
    }
    const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
      res.status(404).json({
        message: "blog not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "Categblogory deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
        description: req.body.description,
      },
      { new: true }
    );
    if (!blog) {
      return res.status(500).json({
        message: "blog cannot be updated",
        error: true,
        success: false,
      });
    }
    imagesArr = [];
    res.status(200).json({
      message: "blog updated",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
