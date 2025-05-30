"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React, { useState } from "react";
import FriendsPanel, { Friend } from "./friendsPanel";
import AddFriendPanel from "./addFriendPanel";
import VideoChatPanel from "./videoChatPanel";
import { Video } from "lucide-react";
import UserProfileDetails from "@/components/chattingPageComponents/UserProfileDetails";
import RequestNotification from "./requestNotification";
import MainTextArea from "./mainTextArea";

type SidebarTab = "friends" | "add-friends" | "video-chat";

// Mock friends data - replace with your actual data source
const mockFriends: Friend[] = [
  { _id: "1", name: "John Doe", status: "online" },
  { _id: "2", name: "Jane Smith", status: "away" },
  { _id: "3", name: "Mike Johnson", status: "offline" },
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

      <UserProfileDetails />

      <div className="bg-blue-50 flex">
        {/* Sidebar */}
        <div className="flex h-[calc(100vh-100px)] mt-4">
          {/* Vertical Navigation */}
          <div className="bg-white p-2 flex flex-col gap-2">
            <RequestNotification />
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
                  selectedFriendId={selectedFriend?._id}
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
        <MainTextArea selectedFriend={selectedFriend} />
      </div>

      <Footer />
    </div>
  );
}
