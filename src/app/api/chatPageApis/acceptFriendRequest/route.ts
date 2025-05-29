import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";
import Friend from "@/app/utils/models/Friend";
import { ApiError,ApiSuccess } from "@/app/services/apiResponse";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return ApiError("Request ID is required");
    }

    await connectionDB();

    // Find the friend request
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return ApiError("Friend request not found");
    }

    if (friendRequest.status !== "pending") {
      return ApiError("Friend request is not pending");
    }

    // Create a new friendship
    await Friend.create({
      user1: friendRequest.sender,
      user2: friendRequest.receiver,
    });

    // Update the friend request status to accepted
    friendRequest.status = "accepted";
    await friendRequest.save();

    return ApiSuccess("Friend request accepted successfully");

  } catch (error: any) {
    console.error("Error in accept friend request:", error);
    return ApiError(error.message);
  }
}
