import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      default: "",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", blogSchema);
export default blogModel;
