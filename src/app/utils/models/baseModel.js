import mongoose from "mongoose";

const baseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const BaseModel = mongoose.models.BaseModel || mongoose.model("BaseModel", baseSchema);
export default BaseModel;
