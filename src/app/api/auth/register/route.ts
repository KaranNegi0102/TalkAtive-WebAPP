import {ApiSuccess , ApiError} from "@/app/services/apiResponse";
import {NextRequest} from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection"
import User from "@/app/utils/models/UserSchema";

export async function POST(req:NextRequest){

  try{
    const {name,email,password,phone} = await req.json();
  
    // console.log("phone",phone);

    if(!name || !email || !password || !phone){
      return ApiError("All fields are required");
    }

   await connectionDB();

  //  console.log("yaha tak chal rha kya ?")
    const existingUser = await User.findOne({email});
    console.log(existingUser);

  
   if(existingUser){
    return ApiError("User already exists");
   }

   const newUser = await User.create({
    name,
    email,
    password,
    phone,
   })

    return ApiSuccess("User created successfully",
    {userId:newUser._id },
    201);

  }catch(error){
    console.log("error in register route -> ",error);
    return ApiError("Internal server error");
  }
}
