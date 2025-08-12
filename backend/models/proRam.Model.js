import mongoose from "mongoose";

const proRamSchema = mongoose.Schema(
  {
    ram: {
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
const proRAMSModel = mongoose.model("proRAMS", proRamSchema);

export default proRAMSModel;
