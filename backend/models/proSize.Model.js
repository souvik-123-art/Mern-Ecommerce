import mongoose from "mongoose";

const proSizeSchema = mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const proSIZEModel = mongoose.model("proSIZE", proSizeSchema);

export default proSIZEModel;
