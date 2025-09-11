import categoryModel from "../models/category.model.js";
import UserModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

//image upload
let imagesArr = [];
export const categoryImageController = async (req, res) => {
  try {
    let imagesArr = [];
    const image = req.files;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.uploader.upload(image[i].path, options);

      imagesArr.push(result.secure_url);

      // Temporary file delete after successful upload
      fs.unlinkSync(`backend/uploads/${image[i].filename}`);
    }

    return res.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      message: error.message || error,
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

export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    const images = category.images;
    for (let img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
      }
    }
    const subCategory = await categoryModel.find({
      parentId: req.params.id,
    });

    for (let i = 0; i < subCategory.length; i++) {
      const thirdSubCategory = await categoryModel.find({
        parentId: subCategory[i]._id,
      });

      for (let i = 0; i < thirdSubCategory.length; i++) {
        const deleteThirdSubCat = await categoryModel.findByIdAndDelete(
          thirdSubCategory[i]._id
        );
      }
      const deleteSubCat = await categoryModel.findByIdAndDelete(
        subCategory[i]._id
      );
    }
    const deleteCat = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deleteCat) {
      res.status(404).json({
        message: "Category not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "Category deleted",
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
