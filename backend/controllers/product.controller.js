import ProductModel from "../models/product.model.js";
import proRAMSModel from "../models/proRam.Model.js";
import proSIZEModel from "../models/proSize.Model.js";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import proWGTModel from "../models/proWeight.Model.js";
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});
var imagesArr = [];
export const productImageController = async (req, res) => {
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
var bannerImage = [];
export const bannerImageController = async (req, res) => {
  try {
    bannerImage = [];
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
          bannerImage.push(result.secure_url);
          fs.unlinkSync(`backend/uploads/${req.files[i].filename}`);
          console.log(req.files[i].filename);
        }
      );
    }

    return res.status(200).json({
      images: bannerImage,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//create product

export const createProduct = async (req, res) => {
  try {
    let product = new ProductModel({
      name: req.body.name,
      bannerTitleName: req.body.bannerTitleName,
      description: req.body.description,
      images: req.body.images,
      bannerImages: req.body.bannerImages,
      isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      catName: req.body.catName,
      catId: req.body.catId,
      subCatId: req.body.subCatId,
      subCat: req.body.subCat,
      thirdSubCat: req.body.thirdSubCat,
      thirdSubCatId: req.body.thirdSubCatId,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      discount: req.body.discount,
      productRam: req.body.productRam,
      size: req.body.size,
      productWeight: req.body.productWeight,
    });

    product = await product.save();

    if (!product) {
      res.status(500).json({
        message: "product not created",
        error: true,
        success: false,
      });
    }
    imagesArr = [];
    res.status(200).json({
      message: "product created",
      error: false,
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPosts,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsByCatId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find({
      catId: req.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsByCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find({
      catName: req.query.catName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsBySubCatId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find({
      subCatId: req.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsByThirdSubCatId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find({
      thirdSubCatId: req.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsBySubCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find({
      subCat: req.query.subCatName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsByThirdSubCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    const products = await ProductModel.find({
      thirdSubCat: req.query.thirdSubCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductsByPrice = async (req, res) => {
  let productList = [];
  if (req.query.catId !== "" && req.query.catId !== undefined) {
    const productListArr = await ProductModel.find({
      catId: req.query.catId,
    }).populate("category");
    productList = productListArr;
  }
  if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
    const productListArr = await ProductModel.find({
      subCatId: req.query.subCatId,
    }).populate("category");
    productList = productListArr;
  }
  if (req.query.thirdSubCatId !== "" && req.query.thirdSubCatId !== undefined) {
    const productListArr = await ProductModel.find({
      thirdSubCatId: req.query.thirdSubCatId,
    }).populate("category");
    productList = productListArr;
  }

  const filteredProducts = productList.filter((product) => {
    if (req.query.minPrice && product.price < parseInt(req.query.minPrice)) {
      return false;
    }
    if (req.query.maxPrice && product.price > parseInt(req.query.maxPrice)) {
      return false;
    }
    return true;
  });
  return res.status(200).json({
    error: false,
    success: true,
    products: filteredProducts,
    totalPages: 0,
    page: 0,
  });
};
export const getAllProductsByRating = async (req, res) => {
  try {
    console.log(req.query.subCatName);
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "page not found", error: true, success: false });
    }
    let products = [];
    if (req.query.catId !== undefined) {
      products = await ProductModel.find({
        rating: req.query.rating,
        catId: req.query.catId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }
    if (req.query.subCatId !== undefined) {
      products = await ProductModel.find({
        rating: req.query.rating,
        subCatId: req.query.subCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }
    if (req.query.thirdSubCat !== undefined) {
      products = await ProductModel.find({
        rating: req.query.rating,
        thirdSubCat: req.query.thirdSubCat,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
      error: false,
      success: true,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductsCount = async (req, res) => {
  try {
    const productsCount = await ProductModel.countDocuments();
    if (!productsCount) {
      return res.status(500).json({
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      productsCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({
      isFeatured: true,
    }).populate("category");
    if (!products) {
      return res.status(500).json({
        message: "products not available",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: products,
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
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );
    if (!product) {
      return res.status(400).json({
        message: "product not available",
        error: true,
        success: false,
      });
    }
    const images = product.images;
    for (let img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
      }
    }
    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      res.status(404).json({
        message: "product not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product deleted",
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
export const deleteMultipleProduct = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      message: "invalid input!",
      error: true,
      success: false,
    });
  }

  for (let i = 0; i < ids?.length; i++) {
    const product = await ProductModel.findById(ids[i]);
    const images = product.images;
    for (let img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        const result = await cloudinary.uploader.destroy(imageName);
      }
    }
  }
  try {
    await ProductModel.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: "products deleted successfully",
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
// get single product

export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );

    if (!product) {
      return res.status(404).json({
        message: "products not found",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      product,
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
export const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        bannerTitleName: req.body.bannerTitleName,
        description: req.body.description,
        images: req.body.images,
        bannerImages: req.body.bannerImages,
        isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        catName: req.body.catName,
        catId: req.body.catId,
        subCatId: req.body.subCatId,
        subCat: req.body.subCat,
        thirdSubCat: req.body.thirdSubCat,
        thirdSubCatId: req.body.thirdSubCatId,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        productRam: req.body.productRam,
        size: req.body.size,
        productWeight: req.body.productWeight,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        message: "the product can not be updates!",
        error: false,
        success: true,
      });
    }
    imagesArr = [];

    return res.status(200).json({
      error: false,
      success: true,
      message: "product successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const createProductRAMS = async (req, res) => {
  try {
    let proRam = new proRAMSModel({
      ram: req.body.ram,
    });
    proRam = await proRam.save();
    if (!proRam) {
      res.status(500).json({
        message: "product RAM not created",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product RAM created",
      error: false,
      success: true,
      proRam,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductRams = async (req, res) => {
  try {
    const productRams = await proRAMSModel.find();
    if (!productRams) {
      return res.status(500).json({
        message: "products Rams not created yet",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: productRams,
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
export const updateProductRam = async (req, res) => {
  try {
    const productRam = await proRAMSModel.findByIdAndUpdate(
      req.params.id,
      {
        ram: req.body.ram,
      },
      { new: true }
    );
    if (!productRam) {
      return res.status(404).json({
        message: "the product RAM can not be updates!",
        error: false,
        success: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "product RAM successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteProductRams = async (req, res) => {
  try {
    const deleteProductRam = await proRAMSModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProductRam) {
      res.status(404).json({
        message: "product RAM not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product RAM deleted",
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

export const createProductSize = async (req, res) => {
  try {
    let proSize = new proSIZEModel({
      size: req.body.size,
    });
    proSize = await proSize.save();
    if (!proSize) {
      res.status(500).json({
        message: "product SIZE not created",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product SIZE created",
      error: false,
      success: true,
      proSize,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductSize = async (req, res) => {
  try {
    const productSizes = await proSIZEModel.find();
    if (!productSizes) {
      return res.status(500).json({
        message: "products Size not created yet",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: productSizes,
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
export const updateProductSize = async (req, res) => {
  try {
    const productSize = await proSIZEModel.findByIdAndUpdate(
      req.params.id,
      {
        size: req.body.size,
      },
      { new: true }
    );
    if (!productSize) {
      return res.status(404).json({
        message: "the product size can not be updated!",
        error: false,
        success: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "product size successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteProductSize = async (req, res) => {
  try {
    const deleteProductSize = await proSIZEModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProductSize) {
      res.status(404).json({
        message: "product SIZE not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product SIZE deleted",
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

export const createProductWgt = async (req, res) => {
  try {
    let proWgt = new proWGTModel({
      wgt: req.body.wgt,
    });
    proWgt = await proWgt.save();
    if (!proWgt) {
      res.status(500).json({
        message: "product WEIGHT not created",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product WEIGHT created",
      error: false,
      success: true,
      proWgt,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllProductWgt = async (req, res) => {
  try {
    const productWgts = await proWGTModel.find();
    if (!productWgts) {
      return res.status(500).json({
        message: "products weight not created yet",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      data: productWgts,
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
export const updateProductWgt = async (req, res) => {
  try {
    const productWgt = await proWGTModel.findByIdAndUpdate(
      req.params.id,
      {
        wgt: req.body.wgt,
      },
      { new: true }
    );
    if (!productWgt) {
      return res.status(404).json({
        message: "the product weight can not be updated!",
        error: false,
        success: true,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "product weight successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteProductWgt = async (req, res) => {
  try {
    const deleteProductWgt = await proWGTModel.findByIdAndDelete(req.params.id);
    if (!deleteProductWgt) {
      res.status(404).json({
        message: "product WEIGHT not found!",
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      message: "product WEIGHT deleted",
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

export const filters = async (req, res) => {
  const {
    catId,
    subCatId,
    thirdSubCatId,
    minPrice,
    maxPrice,
    rating,
    page,
    limit,
  } = req.body;

  const filters = {};

  if (catId?.length) {
    filters.catId = { $in: catId };
  }
  if (subCatId?.length) {
    filters.subCatId = { $in: subCatId };
  }
  if (thirdSubCatId?.length) {
    filters.thirdSubCatId = { $in: thirdSubCatId };
  }
  if (rating?.length) {
    filters.rating = { $in: rating };
  }

  if (minPrice || maxPrice) {
    filters.price = { $gte: +minPrice || 0, $lte: +maxPrice || Infinity };
  }
  try {
    const products = await ProductModel.find(filters)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ProductModel.countDocuments(filters);

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const sortItems = (pro, sortBy, order) => {
  return pro.sort((a, b) => {
    if (sortBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });
};

export const sortBy = async (req, res) => {
  try {
    const { products, sortBy, order } = req.body;

    const sortedItems = sortItems([...products], sortBy, order);

    return res.status(200).json({
      products: sortedItems,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({
        message: "Query is required",
        error: true,
        success: false,
      });
    }
    const items = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { catName: { $regex: query, $options: "i" } },
        { subCat: { $regex: query, $options: "i" } },
        { thirdSubCat: { $regex: query, $options: "i" } },
        { description: { $regex: `\\b${query}\\b`, $options: "i" } },
      ],
    }).populate("category");

    const total = await items?.length;
    return res.status(200).json({
      data: items,
      error: false,
      success: true,
      total: total,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
