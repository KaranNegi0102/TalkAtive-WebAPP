import mongoose from "mongoose";

export default async function connectionDB (){
  try{
    await mongoose.connect("mongodb+srv://karan0102:Gautamn49@projects.yrofojl.mongodb.net/videoandtextWEB"
    ).then(()=>{console.log("Connected to MongoDB");}
    ).catch((error)=>{
      console.log("mongoose connection error -> ",error);
    })
  }catch(error){
    console.log("error in connecting to the database -> ",error);
  }
}