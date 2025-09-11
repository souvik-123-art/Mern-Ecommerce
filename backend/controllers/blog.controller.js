import blogModel from "../models/blog.model.js";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload
// The blogImageController function is already correct.
// It handles the image upload and returns the URLs to the client.
// The client should then use these URLs when creating or updating a blog.

export const blogImageController = async (req, res) => {
  try {
    const imagesArr = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: true,
        success: false,
      });
    }

    for (const file of files) {
      const stream = streamifier.createReadStream(file.buffer);
      const result = await new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.uploader.upload_stream(
          { folder: "mern-ecommerce" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        stream.pipe(cloudinaryStream);
      });
      imagesArr.push(result.secure_url);
    }

    return res.status(200).json({
      images: imagesArr,
      success: true,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      message: error.message || "An error occurred during the upload process.",
      error: true,
      success: false,
    });
  }
};

// --- Corrected createBlog function ---
export const createBlog = async (req, res) => {
  try {
    // The images array is now expected to be in the request body,
    // provided by the client after a successful upload.
    const { title, images, description } = req.body;

    let blog = new blogModel({
      title,
      images,
      description,
    });

    blog = await blog.save();

    if (!blog) {
      return res.status(500).json({
        message: "Blog not created.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blog created successfully.",
      error: false,
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getPublicIdFromUrl = (imgUrl) => {
  try {
    const urlParts = imgUrl.split("/upload/");
    if (urlParts.length < 2) {
      return null;
    }
    const publicIdWithExtension = urlParts[1].split("/").slice(1).join("/");
    const publicId = publicIdWithExtension.substring(
      0,
      publicIdWithExtension.lastIndexOf(".")
    );
    return publicId;
  } catch (error) {
    console.error("Error parsing Cloudinary public ID:", error);
    return null;
  }
};

export const removeImageFromCloudinary = async (req, res) => {
  try {
    const userId = req.userId;
    const imgUrl = req.query.img;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "You need to log in.",
        error: true,
        success: false,
      });
    }

    const publicId = getPublicIdFromUrl(imgUrl);

    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === "ok") {
        user.avatar = undefined;
        await user.save();
        return res.status(200).json(result);
      } else {
        return res.status(500).json({
          message: "Failed to delete image from Cloudinary.",
          error: true,
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid image URL.",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    console.error("Error removing image:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found!",
        error: true,
        success: false,
      });
    }

    const images = blog.images;
    for (const imgUrl of images) {
      const publicId = getPublicIdFromUrl(imgUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const deleteBlogResult = await blogModel.findByIdAndDelete(req.params.id);
    if (!deleteBlogResult) {
      return res.status(404).json({
        message: "Blog not found!",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Blog deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// --- Corrected updateBlog function ---
export const updateBlog = async (req, res) => {
  try {
    // Images are provided in the request body from the client.
    const { title, images, description } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        images,
        description,
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

    res.status(200).json({
      message: "blog updated",
      error: false,
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Blog update error:", error);
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
