import { NextResponse } from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";
import User from "@/app/utils/models/UserSchema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    await connectionDB();

    // Find all pending friend requests where the current user is the receiver
    const friendRequests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    }).populate({
      path: "sender",
      select: "name email", // Only select name and email from the sender
    });

    return NextResponse.json(
      {
        success: true,
        data: friendRequests,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in get friend requests:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
