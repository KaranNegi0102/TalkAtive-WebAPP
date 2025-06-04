"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { fetchUserData } from "@/app/redux/slices/authSlice";
import { useSocket } from "@/app/socketProvider/socketProvider";
import profile from "../../../public/profile.png";
import image from "../../../public/userDetails.jpg";

export default function UserProfileDetails() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state: any) => state.auth);
  const { userStatus } = useSocket();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Get status color based on user's status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const currentUserId = userData?.data?.userId;
  const currentUserStatus = userStatus[currentUserId] || "offline";

  return (
    <div className="w-full h-full border-r-3 border-gray-500 bg-[#f4eded] relative">
      <div
        className="absolute inset-0  bg-cover bg-center bg-no-repeat opacity-20 mt-1"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundPosition: "fill",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10">
        <div className="p-4">
          {/* Profile Header */}
          <div className="flex items-center border-1 bg-[#333234] rounded-md p-3 justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={profile}
                  alt="Profile"
                  className="w-12 h-12 bg-white rounded-full border-2 border-blue-500"
                />
                {/* Status indicator */}
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                    currentUserStatus
                  )}`}
                  title={currentUserStatus}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {userData?.data?.name || "User Name"}
                </h2>
                <p className="text-xs text-white capitalize">
                  {currentUserStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-2 border-t   border-gray-600  pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium text-[#333234]">Email:</span>
              <p className="text-lg hover:underline cursor-pointer text-[#333234]">
                {userData?.data?.email || "user@email.com"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium text-[#333234]">Phone:</span>
              <p className="text-lg hover:underline cursor-pointer text-[#333234]">
                {userData?.data?.phone || "1234567890"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
