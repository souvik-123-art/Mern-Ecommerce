import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
        reuired: true,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    catName: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    catId: {
      type: String,
      default: "",
    },
    subCatId: {
      type: String,
      default: "",
    },
    subCat: {
      type: String,
      default: "",
    },
    thirdSubCat: {
      type: String,
      default: "",
    },
    thirdSubCatId: {
      type: String,
      default: "",
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    sale: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
    },
    bannerImages: [
      {
        type: String,
      },
    ],
    bannerTitleName: {
      type: String,
    },
    isDisplayOnHomeBanner: {
      type: Boolean,
      default: false,
    },
    productRam: [{ type: String, default: null }],
    size: [{ type: String, default: null }],
    productWeight: [{ type: String, default: null }],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
