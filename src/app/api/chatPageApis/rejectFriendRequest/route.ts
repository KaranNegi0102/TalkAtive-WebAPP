import connectionDB from "@/app/utils/dataBase/dbConnection";
import FriendRequest from "@/app/utils/models/FriendRequest";
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

    // Update the friend request status to rejected
    friendRequest.status = "rejected";
    await friendRequest.save();

    return ApiSuccess("Friend request rejected successfully");

  } catch (error: any) {
    console.error("Error in reject friend request:", error);
    return ApiError(error.message);
  }
}
