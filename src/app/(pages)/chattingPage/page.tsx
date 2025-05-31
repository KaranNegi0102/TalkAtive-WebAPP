"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Users, UserPlus, Video, MessageCircle, User } from "lucide-react";
import Navbar from "@/components/navbar";
import FriendsPanel, { Friend } from "./friendsPanel";
import AddFriendPanel from "./addFriendPanel";
import VideoChatPanel from "./videoChatPanel";
import UserProfileDetails from "@/components/chattingPageComponents/UserProfileDetails";
import RequestNotification from "./requestNotification";
import MainTextArea from "./mainTextArea";
import { useAppDispatch, useAppSelector} from "@/app/hooks/hooks";
import { fetchUserData } from "@/app/redux/slices/authSlice";



type SidebarTab = "friends" | "add-friends" | "video-chat" | "user-profile";

interface NavigationButton {
  id: SidebarTab;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  ariaLabel: string;
}

const ChattingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab | null>("friends");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const dispatch = useAppDispatch();


  const {userData} = useAppSelector((state:any)=> state.auth);
  console.log(userData);



  // Navigation configuration
  const navigationButtons: NavigationButton[] = useMemo(
    () => [
      {
        id: "user-profile",
        icon: User,
        label: "User",
        ariaLabel: "View your Profile",
      },
      {
        id: "friends",
        icon: Users,
        label: "Friends",
        ariaLabel: "View friends list",
      },
      {
        id: "add-friends",
        icon: UserPlus,
        label: "Add Friends",
        ariaLabel: "Add new friends",
      },
      {
        id: "video-chat",
        icon: Video,
        label: "Video Chat",
        ariaLabel: "Start video chat",
      },
      
    ],
    []
  );

  const handleTabToggle = useCallback((tab: SidebarTab) => {
    setActiveTab((currentTab) => (currentTab === tab ? null : tab));
  }, []);

  const handleFriendSelect = useCallback((friend: Friend) => {
    setSelectedFriend(friend);
  }, []);

  useEffect(()=>{
    dispatch(fetchUserData());
  },[dispatch]);

  const renderSidebarContent = () => {
    switch (activeTab) {
      case "user-profile":
        return <UserProfileDetails />;
      case "friends":
        return (
          <FriendsPanel onSelectFriend={handleFriendSelect} selectedFriendId={selectedFriend?._id} />
        );
      case "add-friends":
        return <AddFriendPanel />;
      case "video-chat":
        return (
          <VideoChatPanel />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1  flex overflow-hidden">
        {/* Sidebar Container */}
        <aside className="flex bg-white shadow-lg">
          {/* Vertical Navigation */}
          <nav
            className="w-16 bg-[#333234] flex flex-col items-center py-4 gap-2"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="mb-4">
              <RequestNotification />
            </div>

            {navigationButtons.map(({ id, icon: Icon, label, ariaLabel }) => (
              <button
                key={id}
                onClick={() => handleTabToggle(id)}
                className={`
                  group relative p-3 cursor-pointer rounded-xl transition-all duration-200 
                  hover:bg-[#f7f7f7] hover:scale-105 active:scale-95 
                  ${
                    activeTab === id
                      ? "bg-[#f7f7f7] shadow-lg"
                      : "hover:bg-[#f7f7f7]"
                  }
                `}
                aria-label={ariaLabel}
                aria-pressed={activeTab === id}
                title={label}
              >
                <Icon
                  className={`
                    h-6 w-6 transition-colors cursor-pointer duration-200
                    ${
                      activeTab === id
                        ? "text-black"
                        : "text-blue-100 group-hover:text-black"
                    }
                  `}
                />

                {/* Tooltip */}
                <span
                  className="
                  absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-sm 
                  rounded-md opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-200 pointer-events-none whitespace-nowrap z-50
                  before:content-[''] before:absolute before:right-full before:top-1/2 
                  before:-translate-y-1/2 before:border-4 before:border-transparent 
                  before:border-r-gray-900
                "
                >
                  {label}
                </span>
              </button>
            ))}
          </nav>

          {/* Expandable Panel */}
          <div
            className={`
            transition-all duration-300 ease-in-out overflow-hidden
            ${activeTab ? "w-80 border-r border-gray-200" : "w-0"}
          `}
          >
            {activeTab && (
              <div className="w-80 h-full bg-white">
                {renderSidebarContent()}
              </div>
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <section
          className="flex-1 flex flex-col bg-white"
          aria-label="Chat area"
        >
          {selectedFriend ? (
            <MainTextArea selectedFriend={selectedFriend} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center space-y-4">
                <MessageCircle className="h-16 w-16 mx-auto text-gray-300" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">
                    Welcome to Chat
                  </h2>
                  <p className="text-gray-500">
                    Select a friend from the sidebar to start chatting
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main> 
    </div>
  );
};

export default ChattingPage;
