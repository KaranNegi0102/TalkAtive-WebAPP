import { ApiError, ApiSuccess } from "@/app/services/apiResponse";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import UserModelFinal from "@/app/utils/models/userModelaFinal";

export async function GET() {
  try {

    await connectionDB();

    const users = await UserModelFinal.find({});

    if(!users){
      return ApiError("users not found");
    }

    return ApiSuccess("all users Found",users,200);
    

  } catch (error:any) {
    
    console.log(error);
    return ApiError("users not found")
  }
}
