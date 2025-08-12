import mongoose from "mongoose";

const proWeightSchema = mongoose.Schema(
  {
    wgt: {
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
const proWGTModel = mongoose.model("proWGT", proWeightSchema);

export default proWGTModel;
