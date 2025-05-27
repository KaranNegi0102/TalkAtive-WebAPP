import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({
  name: {
    type: String,
  },
});

const Friend =
  mongoose.models.Friend || mongoose.model("Friend", friendsSchema);
export default Friend;
