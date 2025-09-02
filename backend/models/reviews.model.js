import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    image: [
      {
        type: String,
      },
    ],
    userName: {
      type: String,
      default: "",
      required: true,
    },
    review: {
      type: String,
      default: "",
      required: true,
    },
    rating: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("reviews", reviewSchema);
export default reviewModel;
