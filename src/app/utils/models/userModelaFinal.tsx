import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: true,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friend" }],
  },
  {
    timestamps: true,
  }
);

const UserModelFinal =
  mongoose.models.UserModelFinal || mongoose.model("User", UserSchema);
export default UserModelFinal;
