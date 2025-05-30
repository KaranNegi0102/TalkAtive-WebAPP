import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import { Friend } from "./friendsPanel";
import { useSocket } from "@/app/socketProvider/socketProvider";
import { useAppSelector } from "@/app/hooks/hooks";

interface MainTextAreaProps {
  selectedFriend: Friend | null;
}

export default function MainTextArea({ selectedFriend }: MainTextAreaProps) {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, messages } = useSocket();
  const { userData } = useAppSelector((state: any) => state.auth);


  console.log("this is selectedFriend ",selectedFriend);
  
  // Filter messages for current chat
  const chatMessages = messages.filter(
    (msg) =>
      (msg.sender === userData?.data?.userId &&
        msg.receiver === selectedFriend?._id) ||
      (msg.sender === selectedFriend?._id &&
        msg.receiver === userData?.data?.userId)
  );

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && selectedFriend) {
      sendMessage(selectedFriend._id, messageInput.trim());
      setMessageInput("");
    }
  };

  return (
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
            {chatMessages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.sender === userData?.data?.userId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === userData?.data?.userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a friend to start chatting
          </div>
        )}
      </div>

      {/* input box for the message */}
      <form
        onSubmit={handleSendMessage}
        className="px-4 py-4 border-t border-gray-200"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={
              selectedFriend ? "Type a message..." : "Select a friend to chat"
            }
            disabled={!selectedFriend}
            className="w-full text-black p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!selectedFriend || !messageInput.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
