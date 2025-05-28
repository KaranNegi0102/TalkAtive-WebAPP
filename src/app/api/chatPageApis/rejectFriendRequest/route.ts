import { NextResponse } from "next/server";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json(
        { success: false, message: "Request ID is required" },
        { status: 400 }
      );
    }

    await connectionDB();

    // Find the friend request
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return NextResponse.json(
        { success: false, message: "Friend request not found" },
        { status: 404 }
      );
    }

    if (friendRequest.status !== "pending") {
      return NextResponse.json(
        { success: false, message: "Friend request is not pending" },
        { status: 400 }
      );
    }

    // Update the friend request status to rejected
    friendRequest.status = "rejected";
    await friendRequest.save();

    return NextResponse.json(
      {
        success: true,
        message: "Friend request rejected successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in reject friend request:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
