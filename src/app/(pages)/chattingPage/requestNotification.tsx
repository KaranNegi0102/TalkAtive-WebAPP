"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import image from "../../../../public/photo4.jpg";
import axios from "axios";
import { useAppSelector } from "@/app/hooks/hooks";

type FriendRequest = {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

interface RequestNotificationProps {
  onRequestsChange?: (count: number) => void;
}

export default function RequestNotification({
  onRequestsChange,
}: RequestNotificationProps) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const { userData } = useAppSelector((state: any) => state.auth);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `/api/chatPageApis/getFriendRequests?userId=${userData?.data?.userId}`
      );

      if (response.data.success) {
        const pendingRequests = response.data.data.filter(
          (request: FriendRequest) => request.status === "pending"
        );
        setRequests(pendingRequests);
        onRequestsChange?.(pendingRequests.length);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  // Fetch requests immediately when component mounts
  useEffect(() => {
    if (userData?.data?.userId) {
      fetchRequests();
    }
  }, [userData]);

  // Set up polling to check for new requests every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (userData?.data?.userId) {
        fetchRequests();
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [userData]);

  const handleAccept = async (requestId: string) => {
    try {
      const response = await axios.post(
        "/api/chatPageApis/acceptFriendRequest",
        {
          requestId,
        }
      );

      if (response.data.success) {
        fetchRequests(); // Refresh the requests list
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const response = await axios.post(
        "/api/chatPageApis/rejectFriendRequest",
        {
          requestId,
        }
      );
      if (response.data.success) {
        fetchRequests(); // Refresh the requests list
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <div className="w-full p-3 border-r-3 border-gray-500 h-full flex flex-col relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mt-1"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundPosition: "fill",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="border-b-2 p-2 border-3 text-center bg-[#333234] rounded-md">
          <h1 className="text-xl font-semibold text-white">Friend Requests</h1>
        </div>

        {/* Requests List */}
        <div className="flex-1 mt-1 border-b-3 border-gray-500 overflow-y-auto">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request._id}
                className="p-2 hover:bg-[#f7f7f7] bg-[#e6e6e6] hover:text-black mb-3 border-gray-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-md cursor-pointer m-1"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex items-center">
                    <div className="relative">
                      <Image
                        src={profile}
                        alt={request.sender.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-xs hover:text-gray-500">
                        {request.sender.name}
                      </h3>
                      <p className="text-xs text-gray-500 hover:text-gray-500">
                        {request.sender.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="px-4 py-2 bg-[#333234] cursor-pointer text-white rounded-md hover:bg-black transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No pending friend requests
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
