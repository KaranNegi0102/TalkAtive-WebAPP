"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import axios from "axios";
import { useAppSelector } from "@/app/hooks/hooks";

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

  const { userData } = useAppSelector((state: any) => state.auth);
  console.log("this is userData in addFriend panel", userData);


  //getting the users
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/chatPageApis/getUsers");
        console.log("this is response", response);

        if (response.data.success) {
          // Filter out the logged-in user from the list
          const filteredUsers = response.data.data.filter(
            (user: User) => user.email !== userData?.data?.email
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
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


  function addFriend(userId:._id){


  }


  const filteredFriends = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full  bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl text-black font-bold">Add Friends</h1>
      </div>

      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-black p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* List of potential friends */}
      <div className="overflow-y-auto h-[calc(100%-120px)]">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((user) => (
            <div
              key={user._id}
              className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
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
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    // TODO: Implement add friend functionality
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
