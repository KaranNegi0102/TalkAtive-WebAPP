import { ApiError , ApiSuccess } from "@/app/services/apiResponse";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";
import Friend from "@/app/utils/models/Friend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { senderId, receiverId } = await req.json();
    // console.log("this is sender and receiver",senderId,receiverId);


    if (!senderId || !receiverId) {
      return ApiError("Missing required fields");
    }

    await connectionDB();

    // Check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    // console.log("request already exist ->",existingRequest);

    if (existingRequest) {
      return NextResponse.json({
        success: false,
        message: "Friend request already exists"
      }, { status: 400 });
    }

    // console.log("yaha tak chal rha kya code -check 1")

    // Check if they are already friends
    const existingFriendship = await Friend.findOne({
      $or: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId },
      ],
    });

    // console.log("this is existingfriendship ->",existingFriendship)
    // console.log("yaha tak chal rha kya code -check 2")

    if (existingFriendship) {
      return ApiError("Users are already friends");
    }

    // Create new friend request
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    return ApiSuccess(
      "Friend request sent successfully",
      {data:friendRequest},
    );
  } catch (error: any) {
    console.error("Error in add friend API:", error);
    return ApiError(error.message);
  }
}
