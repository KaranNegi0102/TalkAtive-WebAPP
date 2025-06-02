"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import axios from "axios";
import { useAppSelector } from "@/app/hooks/hooks";
import { UserPlus } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  status?: "online" | "offline";
  phone?: string;
};

export default function AddFriendPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const { userData } = useAppSelector((state: any) => state.auth); //#f7f7f7 #333234
  console.log("this is userData in addFriend panel", userData.data);

  //getting the users
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `/api/chatPageApis/getUsers?userId=${userData?.data?.userId}`
        );
        console.log("this is reponse ", response);

        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?.data?.userId) {
      fetchUser();
    }
  }, [userData]);

  // // Mock data for potential friends
  // const potentialFriends: User[] = [
  //   {
  //     id: "1",
  //     name: "Alice Smith",
  //     email: "alice@example.com",
  //     status: "online",
  //   },
  //   {
  //     id: "2",
  //     name: "Bob Johnson",
  //     email: "bob@example.com",
  //     status: "offline",
  //   },
  //   {
  //     id: "3",
  //     name: "Carol White",
  //     email: "carol@example.com",
  //     status: "online",
  //   },
  // ];

  async function addFriend(receiverId: string) {
    try {
      const response = await axios.post("/api/chatPageApis/addfriendApi", {
        senderId: userData?.data?.userId,
        receiverId: receiverId,
      });
      console.log("this is response->", response);

      if (response.data.success) {
        alert("Friend request sent successfully!");
      } else {
        alert(response.data.message || "Failed to send friend request");
      }
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.message || "Failed to send friend request");
    }
  }

  const filteredFriends = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone &&
        user.phone.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full p-3 border-r-3 border-gray-500 h-full flex flex-col">
      {/* Header */}
      <div className="border-b-2 p-2 border-3 text-center  bg-[#333234] rounded-md">
        <h1 className="text-xl font-semibold text-white flex items-center justify-center gap-4">
          Add Friends <UserPlus className="w-5 h-5" />
        </h1>
      </div>

      {/* Search bar */}
      <div className="p-1 mt-4 bg-[#f4eded]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or phone "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#333234] focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* List of potential friends */}
      <div className="flex-1 mt-1 border-b-3 border-gray-500 overflow-y-auto">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((user) => (
            <div
              key={user._id}
              className="p-2 hover:bg-[#f7f7f7] bg-[#e6e6e6] hover:text-black mb-3 border-gray-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-md cursor-pointer m-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={profile}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === "online"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium hover:text-gray-500">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 hover:text-gray-500">
                      {user.phone}
                    </p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-[#333234] cursor-pointer text-white rounded-md hover:bg-black transition-colors"
                  onClick={() => {
                    console.log("Add friend:", user._id);
                    addFriend(user._id);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}
