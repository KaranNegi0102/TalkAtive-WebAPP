import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import UserModelFinal from "@/app/utils/models/userModelaFinal";
import { ApiError, ApiSuccess } from "@/app/services/apiResponse";

export async function GET(){
  try{
    await connectionDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("AuthToken")?.value;

    if(!token){
      return ApiError("Unauthorized",401);
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {userId:string , email:string};

    const existingUser = await UserModelFinal.findOne({_id:decodedToken.userId});

    console.log("existingUser --> ",existingUser.friends);

    if(!existingUser){
      return ApiError("Unauthorized",401);
    }

    const UserDataDetails ={
      userId:existingUser._id,
      name:existingUser.name,
      email:existingUser.email,
      password:existingUser.password,
      phone:existingUser.phone,
      friends:existingUser.friends
    }

    return ApiSuccess("user found successfully",UserDataDetails,200);
  }
  catch(error:any){
    console.log("error in checkUser --> ",error);
    return ApiError("Internal server error",500);
  }
}
