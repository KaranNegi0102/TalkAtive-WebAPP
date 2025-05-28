import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId, ref: "User"
  },
  name: {
    type: String,
  },
  
});

const Friend =
  mongoose.models.Friend || mongoose.model("Friend", friendsSchema);
export default Friend;
