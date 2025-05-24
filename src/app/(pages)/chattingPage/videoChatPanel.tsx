"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import { Friend } from "./friendsPanel";

interface VideoChatPanelProps {
  friends: Friend[];
  onLeaveCall?: () => void;
}

const VideoChatPanel: React.FC<VideoChatPanelProps> = ({
  friends,
  onLeaveCall,
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCallActive) {
      // Initialize local video stream
      const initializeMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing media devices:", error);
        }
      };

      initializeMedia();

      // Cleanup function
      return () => {
        if (localVideoRef.current?.srcObject) {
          const stream = localVideoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
        }
      };
    }
  }, [isCallActive]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const startCall = (friend: Friend) => {
    setSelectedFriend(friend);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setSelectedFriend(null);
    if (onLeaveCall) {
      onLeaveCall();
    }
  };

  if (!isCallActive) {
    return (
      <div className="flex flex-col h-full bg-white p-4">
        <h2 className="text-xl font-semibold mb-4">Start Video Call</h2>
        <div className="space-y-2">
          {friends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => startCall(friend)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Image
                src={profile}
                alt={friend.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start">
                <span className="font-medium">{friend.name}</span>
                <span
                  className={`text-sm ${
                    friend.status === "online"
                      ? "text-green-500"
                      : friend.status === "away"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {friend.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4">
      <div className="flex-1 relative rounded-lg overflow-hidden">
        {/* Remote Video */}
        <div className="absolute inset-0">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Local Video */}
        <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-white">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${!isMicOn ? "bg-red-500" : "bg-gray-700"}`}
          onClick={toggleMic}
        >
          {isMicOn ? (
            <Mic className="h-6 w-6" />
          ) : (
            <MicOff className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${
            !isVideoOn ? "bg-red-500" : "bg-gray-700"
          }`}
          onClick={toggleVideo}
        >
          {isVideoOn ? (
            <Video className="h-6 w-6" />
          ) : (
            <VideoOff className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-red-500"
          onClick={endCall}
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default VideoChatPanel;
