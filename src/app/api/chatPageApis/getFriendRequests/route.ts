import { ApiError, ApiSuccess } from "@/app/services/apiResponse";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectionDB();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return ApiError("User ID is required");
    }

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name email");

    return ApiSuccess("Friend requests found", requests);
  } catch (error: any) {
    console.error("Error fetching friend requests:", error);
    return ApiError("Failed to fetch friend requests");
  }
}
