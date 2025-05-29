import { ApiError, ApiSuccess } from "@/app/services/apiResponse";
import connectionDB from "@/app/utils/dataBase/dbConnection";
import User from "@/app/utils/models/UserSchema";
import Friend from "@/app/utils/models/Friend";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectionDB();

    // Get the userId from query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return ApiError("User ID is required");
    }

    // Find all users
    const allUsers = await User.find({});

    // Find all friends of the current user
    const friends = await Friend.find({
      $or: [{ user1: userId }, { user2: userId }],
    });

    // console.log("these are friends of the current users", friends);

    // Get IDs of all friends
    const friendIds = friends.map((friend) =>
      friend.user1.toString() === userId
        ? friend.user2.toString()
        : friend.user1.toString()
    );

    // console.log("this is friendIds -> ", friendIds);

    // Filter out the current user and their friends
    const nonFriends = allUsers.filter((user) => {
      const currentUserId = user._id.toString();
      // Check if the user is not the current user and not in friendIds
      return (
        currentUserId !== userId &&
        !friendIds.some((friendId) => friendId === currentUserId)
      );
    });

    // console.log("these are non friends ->", nonFriends);

    if (!nonFriends.length) {
      return ApiSuccess("No new users found", []);
    }

    return ApiSuccess("Potential friends found", nonFriends);
  } catch (error: any) {
    console.log(error);
    return ApiError("Failed to fetch users");
  }
}
