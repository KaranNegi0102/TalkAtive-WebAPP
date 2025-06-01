import {NextRequest} from "next/server";
import dbConnection from "@/app/lib/dbConnection";
import { ApiError , ApiSuccess} from "@/app/services/apiResponse";
import jwt from "jsonwebtoken";
import User from "@/app/utils/models/UserSchema";

export async function GET(req:NextRequest){

  try{
    await dbConnection();

    const token = req.cookies.get("AuthToken")?.value;
    if(!token){
      return ApiError("Token not found");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as 
    {               //upper type banane se badiya h aise bhej do
      userId:string;
      email:string;
    }
    
    const existingUser = await User.findById(decodedToken.userId);
    if(!existingUser){
      return ApiError("user not found")
    }







  }catch(error){
    console.log(error)
  }

}