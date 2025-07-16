import mongoose from "mongoose";

const myListSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const myListModel = mongoose.model("myList", myListSchema);
export default myListModel;