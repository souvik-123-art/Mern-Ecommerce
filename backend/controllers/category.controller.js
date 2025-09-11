import categoryModel from "../models/category.model.js";
import UserModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import streamifier from "streamifier";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});
const getPublicIdFromUrl = (imgUrl) => {
  // Split the URL to get the part after /upload/
  const urlParts = imgUrl.split("/upload/");
  if (urlParts.length < 2) {
    return null;
  }
  // The path after /upload/ can contain version numbers, folders, and the file name.
  // We need to slice off the version (if present) and the file extension.
  const publicIdWithExtension = urlParts[1].split("/").slice(1).join("/");
  // The public ID is the part of the string before the last dot (the file extension).
  const publicId = publicIdWithExtension.substring(
    0,
    publicIdWithExtension.lastIndexOf(".")
  );

  return publicId;
};
//image upload
export const categoryImageController = async (req, res) => {
  try {
    const imagesArr = [];
    const files = req.files;

    // Check if files exist to avoid errors
    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: true,
        success: false,
      });
    }

    // Loop through each file uploaded by multer
    for (const file of files) {
      // Create a readable stream from the file's in-memory buffer
      const stream = streamifier.createReadStream(file.buffer);

      // Wrap the upload process in a Promise to use async/await
      const result = await new Promise((resolve, reject) => {
        // Use Cloudinary's upload_stream method to handle the upload
        const cloudinaryStream = cloudinary.uploader.upload_stream(
          {
            folder: "mern-ecommerce", // Optional: Organize uploads in a specific folder
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        // Pipe the stream from memory directly to Cloudinary
        stream.pipe(cloudinaryStream);
      });

      // Push the secure URL of the uploaded image to the array
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

export const createCategory = async (req, res) => {
  try {
    let category = new categoryModel({
      name: req.body.name,
      images: req.body.images,
      parentId: req.body.parentId,
      parentCatName: req.body.parentCatName,
    });
    if (!category) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
    category = await category.save();
    imagesArr = [];
    return res.status(200).json({
      message: "category created",
      error: false,
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });
    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });
    return res.status(200).json({
      error: false,
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getCategoriesCount = async (req, res) => {
  try {
    const categoryCount = await categoryModel.countDocuments({
      parentId: undefined,
    });
    if (!categoryCount) {
      res.status(500).json({ success: false, error: true });
    } else {
      res.status(200).json({
        categoryCount,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getSubCategoriesCount = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(500).json({ success: false, error: true });
    }
    const subCatList = [];
    for (let cat of categories) {
      if (cat.parentId !== undefined && cat.parentId !== null) {
        subCatList.push(cat);
      }
    }
    res.send({
      subCategoriesCount: subCatList.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        message: "The category with the given id was not found.",
        error: true,
        success: false,
      });
    }

    res.send({
      category,
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
      // If the image is successfully deleted, you might also want to remove the URL from the user document
      user.avatar = undefined;
      await user.save();
      return res.status(200).send(result);
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
};

// --- Updated deleteCategory function ---
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
        error: true,
        success: false,
      });
    }

    // Delete images associated with the category
    const images = category.images;
    for (const imgUrl of images) {
      const publicId = getPublicIdFromUrl(imgUrl);
      if (publicId) {
        // Asynchronously destroy the image on Cloudinary
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // You have a deeply nested category structure, so deleting all children is complex.
    // The following logic seems to be what you intended.
    const subCategories = await categoryModel.find({ parentId: req.params.id });

    for (const subCat of subCategories) {
      // Find and delete third-level subcategories
      const thirdSubCategories = await categoryModel.find({
        parentId: subCat._id,
      });
      for (const thirdSubCat of thirdSubCategories) {
        await categoryModel.findByIdAndDelete(thirdSubCat._id);
      }
      // Delete second-level subcategory
      await categoryModel.findByIdAndDelete(subCat._id);
    }

    // Delete the main category
    const deletedCategory = await categoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found!",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Category deleted successfully.",
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
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
        parentId: req.body.parentId,
        parentCatName: req.body.parentCatName,
      },
      { new: true }
    );
    if (!category) {
      return res.status(500).json({
        message: "category cannot be updated",
        error: true,
        success: false,
      });
    }
    const children = await categoryModel.find({ parentId: category._id });

    for (let child of children) {
      await categoryModel.findByIdAndUpdate(
        child._id,
        { parentCatName: category.name },
        { new: true }
      );
    }
    imagesArr = [];
    res.status(200).json({
      message: "Category updated",
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
