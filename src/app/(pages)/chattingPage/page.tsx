"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React, { useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import FriendsPanel, { Friend } from "./friendsPanel";
import AddFriendPanel from "./addFriendPanel";
import VideoChatPanel from "./videoChatPanel";
import { Video } from "lucide-react";

type SidebarTab = "friends" | "add-friends" | "video-chat";

// Mock friends data - replace with your actual data source
const mockFriends: Friend[] = [
  { id: "1", name: "John Doe", status: "online" },
  { id: "2", name: "Jane Smith", status: "away" },
  { id: "3", name: "Mike Johnson", status: "offline" },
];

export default function ChattingPage() {
  const [activeTab, setActiveTab] = useState<SidebarTab | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div>
      <Navbar />

      <div className="bg-blue-50 flex">
        {/* Sidebar */}
        <div className="flex h-[calc(100vh-100px)] mt-4">
          {/* Vertical Navigation */}
          <div className="bg-white p-2 flex flex-col gap-2">
            <button
              onClick={() =>
                setActiveTab(activeTab === "friends" ? null : "friends")
              }
              className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                activeTab === "friends" ? "bg-gray-100" : ""
              }`}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveTab(activeTab === "add-friends" ? null : "add-friends")
              }
              className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                activeTab === "add-friends" ? "bg-gray-100" : ""
              }`}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveTab(activeTab === "video-chat" ? null : "video-chat")
              }
              className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                activeTab === "video-chat" ? "bg-gray-100" : ""
              }`}
            >
              <Video className="h-6 w-6" />
            </button>
          </div>

          {/* Panel Content */}
          {activeTab && (
            <div className="w-80 bg-white border-l border-gray-200 transition-all duration-300">
              {activeTab === "friends" ? (
                <FriendsPanel
                  onSelectFriend={handleFriendSelect}
                  selectedFriendId={selectedFriend?.id}
                />
              ) : activeTab === "add-friends" ? (
                <AddFriendPanel />
              ) : (
                <VideoChatPanel
                  friends={mockFriends}
                  onLeaveCall={() => setActiveTab(null)}
                />
              )}
            </div>
          )}
        </div>

        {/* right div for the chat */}
        <div className="flex-1 p-2 border-2 border-red-500 mt-4 flex flex-col h-[calc(100vh-100px)]">
          <div className="flex items-center gap-2 border-4 border-black">
            <Image
              src={profile}
              alt={selectedFriend?.name || "Select a friend"}
              className="w-10 h-10 rounded-full"
            />
            <label className="text-lg text-black font-bold">
              {selectedFriend?.name || "Select a friend"}
            </label>
            {selectedFriend?.status && (
              <span
                className={`ml-2 text-sm ${
                  selectedFriend.status === "online"
                    ? "text-green-500"
                    : selectedFriend.status === "away"
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                {selectedFriend.status}
              </span>
            )}
          </div>

          {/* chatting area where the messages will be shown */}
          <div className="flex-1 overflow-y-auto px-4 mt-4">
            {selectedFriend ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={profile}
                    alt={selectedFriend.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <label className="text-lg text-black font-bold">
                    {selectedFriend.name}
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a friend to start chatting
              </div>
            )}
          </div>

          {/* input box for the message */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={
                  selectedFriend
                    ? "Type a message..."
                    : "Select a friend to chat"
                }
                disabled={!selectedFriend}
                className="w-full text-black p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                disabled={!selectedFriend}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
