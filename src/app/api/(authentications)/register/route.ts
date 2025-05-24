import {ApiSuccess , ApiError} from "@/app/services/apiResponse";
import {NextRequest} from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection"
import User from "@/app/utils/models/userModel";



export async function POST(req:NextRequest){

  try{
    const {name,email,password } = await req.json();
  
    if(!name || !email || !password){
      return ApiError("All fields are required");
    }

   await connectionDB();

   const existingUser = await User.findOne({email});

   if(existingUser){
    return ApiError("User already exists");
   }

   const newUser = await User.create({
    name,
    email,
    password,
   })

   return ApiSuccess("User created successfully",
    {userId:newUser._id},
    201);

   }catch(error){
    console.log("error in register route -> ",error);
    return ApiError("Internal server error");
   }





}
