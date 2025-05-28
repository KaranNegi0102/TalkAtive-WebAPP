import { ApiError, ApiSuccess } from "@/app/services/apiResponse";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import User from "@/app/utils/models/UserSchema";

export async function GET() {
  try {
    await connectionDB();
    const users = await User.find({});
    if(!users){
      return ApiError("users not found");
    }
    return ApiSuccess("all users Found",users,200);
  } catch (error:any) {
    console.log(error);
    return ApiError("users not found")
  }
}
