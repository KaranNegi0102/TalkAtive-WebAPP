import {ApiSuccess , ApiError} from "@/app/services/apiResponse";
import {NextRequest} from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection"
import BaseModel from "@/app/utils/models/baseModel"; 



export async function POST(req:NextRequest){

  try{
    const {name,email,password,phone} = await req.json();
  
    console.log("phone",phone);

    if(!name || !email || !password || !phone){
      return ApiError("All fields are required");
    }

   await connectionDB();

    const existingUser = await BaseModel.findOne({email});

   if(existingUser){
    return ApiError("User already exists");
   }

   const newUser = await BaseModel.create({
    name,
    email,
    password,
    phone
   })

   return ApiSuccess("User created successfully",
    {userId:newUser._id,phone:newUser.phone},
    201);



   }catch(error){
    console.log("error in register route -> ",error);
    return ApiError("Internal server error");
   }





}
