import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
    },
    brand: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
    },
    oldPrice: {
      type: Number,
    },
    size: {
      type: String,
    },
    ram: {
      type: String,
    },
    weight: {
      type: String,
    },
    discount: {
      type: Number,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const cartProductModel = mongoose.model("cartproducts", cartProductSchema);
export default cartProductModel;
