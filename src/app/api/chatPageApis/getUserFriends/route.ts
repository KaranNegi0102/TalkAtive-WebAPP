import { NextResponse } from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import Friend from "@/app/utils/models/Friend";
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

    // Find all friendships where the user is either user1 or user2
    const friendships = await Friend.find({
      $or: [{ user1: userId }, { user2: userId }],
    });

    // Get the IDs of all friends
    const friendIds = friendships.map((friendship) =>
      friendship.user1.toString() === userId
        ? friendship.user2
        : friendship.user1
    );

    // Get the user details for all friends
    const friends = await User.find(
      { _id: { $in: friendIds } },
      { name: 1, email: 1, status: 1, phone: 1 }
    );

    return NextResponse.json(
      {
        success: true,
        data: friends,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in get user friends:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
