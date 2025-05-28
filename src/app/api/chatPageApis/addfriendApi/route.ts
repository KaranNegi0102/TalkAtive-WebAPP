import { NextResponse } from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";
import Friend from "@/app/utils/models/Friend";

export async function POST(req: Request) {
  try {
    const { senderId, receiverId } = await req.json();
    console.log("this is sender and receiver",senderId,receiverId);


    if (!senderId || !receiverId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectionDB();

    // Check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingRequest) {
      return NextResponse.json(
        { success: false, message: "Friend request already exists" },
        { status: 400 }
      );
    }

    // Check if they are already friends
    const existingFriendship = await Friend.findOne({
      $or: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId },
      ],
    });

    if (existingFriendship) {
      return NextResponse.json(
        { success: false, message: "Users are already friends" },
        { status: 400 }
      );
    }

    // Create new friend request
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Friend request sent successfully",
        data: friendRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in add friend API:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
