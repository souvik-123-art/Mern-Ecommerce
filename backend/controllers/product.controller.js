import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
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

//create product

export const createProduct = async (req, res) => {
  try {
    let product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      images: imagesArr,
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
    console.log("subCatName from query: ", req.query.subCatName);
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
    console.log("subCatName from query: ", req.query.subCatName);
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
      user.avatar = undefined;
      await user.save();
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
        description: req.body.description,
        images: req.body.images,
        // images: imagesArr,
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
