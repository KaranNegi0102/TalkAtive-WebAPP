"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
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

export default function RequestNotification() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useAppSelector((state: any) => state.auth);

  const fetchRequests = async () => {
    try {
      console.log("yaha tak chal rha ??");
      const response = await axios.get(
        `/api/chatPageApis/getFriendRequests?userId=${userData?.data?.userId}`
      );
      console.log("fetch request response -> ", response);

      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  useEffect(() => {
    if (userData?.data?.userId) {
      fetchRequests();
    }
  }, [userData]);

  const handleAccept = async (requestId: string) => {
    try {
      const response = await axios.post(
        "/api/chatPageApis/acceptFriendRequest",
        {
          requestId,
        }
      );
      console.log("this is response in notification", response);

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
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {requests.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {requests.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute  ml-[50%] mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Friend Requests</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request._id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={profile}
                      alt={request.sender.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{request.sender.name}</h4>
                      <p className="text-sm text-gray-500">
                        {request.sender.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="flex-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="flex-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Reject
                    </button>
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
      )}
    </div>
  );
}
