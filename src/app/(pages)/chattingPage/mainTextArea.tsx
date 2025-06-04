import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import coffee from "../../../../public/35184.jpg";
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

  console.log("this is selectedFriend ", selectedFriend);

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
    <div className="flex-1 bg-[#f7f7f7] p-2  rounded-md flex flex-col h-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${coffee.src})`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex shadow-xl rounded-md bg-[#333234] items-center p-2 gap-2 justify-between">
          <div className="flex items-center  gap-2">
            <Image
              src={profile}
              alt={selectedFriend?.name || "Select a friend"}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <label className="text-lg text-white font-bold">
                {selectedFriend?.name || "Select a friend"}
              </label>
              {selectedFriend?.status && (
                <span
                  className={`text-xs text-white ${
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
          </div>
          <label className="text-sm mr-3 text-white">
            {selectedFriend?.phone || "Select a friend"}
          </label>
        </div>

        {/* //#f7f7f7 #333234 */}
        {/* chatting area where the messages will be shown */}
        <div className="flex-1  overflow-y-auto px-2 mt-4">
          {selectedFriend ? (
            <div className="flex  flex-col gap-2">
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
                        ? "bg-[#333234] text-white"
                        : "bg-[#5c2503] text-white"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs  opacity-70">
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
          className="py-4 "
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
              className="w-full bg-[#333234]  text-white p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-[#333234] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!selectedFriend || !messageInput.trim()}
              className="bg-[#333234] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
