import mongoose from "mongoose";

export default async function connectionDB (){
  try{
    await mongoose.connect(process.env.DATABASE_URL
    ).then(()=>{console.log("Connected to MongoDB");}
    ).catch((error)=>{
      console.log("mongoose connection error -> ",error);
    })
  }catch(error){
    console.log("error in connecting to the database -> ",error);
  }
}