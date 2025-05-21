"use client";

import React, { useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";

export type Friend = {
  id: string;
  name: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
  unreadCount?: number;
};

type FriendsPanelProps = {
  onSelectFriend: (friend: Friend) => void;
  selectedFriendId?: string;
};

export default function FriendsPanel({
  onSelectFriend,
  selectedFriendId,
}: FriendsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for friends
  const friends: Friend[] = [
    { id: "1", name: "John Doe", status: "online", unreadCount: 3 },
    { id: "2", name: "Alice Smith", status: "away", lastSeen: "2m ago" },
    { id: "3", name: "Bob Johnson", status: "offline", lastSeen: "1h ago" },
    { id: "4", name: "Emma Wilson", status: "online" },
    { id: "5", name: "Michael Brown", status: "offline", lastSeen: "5h ago" },
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Friend["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Friends</h1>
        <p className="text-sm text-gray-500 mt-1">
          {friends.filter((f) => f.status === "online").length} online
        </p>
      </div>

      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-gray-900 p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Friends list */}
      <div className="flex-1 overflow-y-auto">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 ${
                selectedFriendId === friend.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={profile}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                        friend.status
                      )}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{friend.name}</h3>
                    {friend.lastSeen && (
                      <p className="text-sm text-gray-500">{friend.lastSeen}</p>
                    )}
                  </div>
                </div>
                {friend.unreadCount && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {friend.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No friends found</div>
        )}
      </div>
    </div>
  );
}
