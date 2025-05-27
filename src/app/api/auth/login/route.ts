import {NextRequest} from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import {ApiError,ApiSuccess} from "@/app/services/apiResponse";
import jwt from "jsonwebtoken";
import UserModelFinal from "@/app/utils/models/userModelaFinal";


export async function POST(req:NextRequest){
  
  try{
    await connectionDB();

    const {email,password} = await req.json();

    if(!email || !password){
      return ApiError("All fields are required");
    }

    const existingUser = await UserModelFinal.findOne({email});

    if(!existingUser){
      return ApiError("User not found");
    }

    const token = jwt.sign(
      {userId:existingUser._id,email:existingUser.email},
      process.env.JWT_SECRET as string,
      {expiresIn:"7d"}
    )

    const cookieOptions = {
      httpOnly:true,
      maxAge:7 * 24 * 60 * 60 * 1000,
      path:"/"
    }


    const UserData = {
      userId:existingUser._id,
      name:existingUser.name,
      email:existingUser.email,
      phone:existingUser.phone
    }


    return ApiSuccess("Login Successful",
      {userData:UserData},
      200,
      {
        name:"AuthToken",
        value:token,
        options:cookieOptions
      });

  }catch(error){
    console.log("error in login route -> ",error);
    return ApiError("Internal server error");
  }
}