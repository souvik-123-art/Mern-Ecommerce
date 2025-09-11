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

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: true,
        success: false,
      });
    }

    for (const file of files) {
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
        streamifier.createReadStream(file.buffer).pipe(cloudinaryStream);
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

// --- Corrected createCategory function ---
export const createCategory = async (req, res) => {
  try {
    // The images are now expected to be in the request body,
    // as they were sent by the client after a successful upload.
    const { name, images, parentId, parentCatName } = req.body;

    let category = new categoryModel({
      name,
      images,
      parentId,
      parentCatName,
    });

    category = await category.save();

    if (!category) {
      return res.status(500).json({
        message: "Category not created.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category created successfully.",
      error: false,
      success: true,
      category,
    });
  } catch (error) {
    console.error("Category creation error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// --- Corrected removeImageFromCloudinary function ---
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
  } catch (error) {
    console.error("Error removing image:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// --- Corrected deleteCategory function ---
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

    const images = category.images;
    for (const imgUrl of images) {
      const publicId = getPublicIdFromUrl(imgUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const subCategories = await categoryModel.find({ parentId: req.params.id });
    for (const subCat of subCategories) {
      const thirdSubCategories = await categoryModel.find({
        parentId: subCat._id,
      });
      for (const thirdSubCat of thirdSubCategories) {
        await categoryModel.findByIdAndDelete(thirdSubCat._id);
      }
      await categoryModel.findByIdAndDelete(subCat._id);
    }

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
    console.error("Error deleting category:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// --- Corrected updateCategory function ---
export const updateCategory = async (req, res) => {
  try {
    // The images array is received directly from the request body.
    const { name, images, parentId, parentCatName } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        images, // Use the images from the request body
        parentId,
        parentCatName,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).json({
        message: "Category cannot be updated.",
        error: true,
        success: false,
      });
    }

    const children = await categoryModel.find({
      parentId: updatedCategory._id,
    });
    for (let child of children) {
      await categoryModel.findByIdAndUpdate(
        child._id,
        { parentCatName: updatedCategory.name },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      updatedCategory, // It's good practice to send back the updated document
    });
  } catch (error) {
    console.error("Category update error:", error);
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
