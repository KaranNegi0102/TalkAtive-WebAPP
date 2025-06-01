"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/app/hooks/hooks";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

interface SocketContextType {
  socket: Socket | null;
  userStatus: { [key: string]: string };
  sendMessage: (receiverId: string, message: string) => void;
  messages: Message[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  userStatus: {},
  sendMessage: () => {},
  messages: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const { userData } = useAppSelector((state: any) => state.auth);

  const sendMessage = (receiverId: string, message: string) => {
    if (socket && userData?.data?.userId) {
      socket.emit("send_message", {
        senderId: userData.data.userId,
        receiverId,
        message,
      });
    }
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    // user connect and disconnect par uske status ke saath kya hoga woh isme likha h
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      // If user is logged in, emit user_connected event
      if (userData?.data?.userId) {
        console.log(
          "Emitting user_connected with userId:",
          userData.data.userId
        );
        newSocket.emit("user_connected", { userId: userData.data.userId });
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      // If user was logged in, update their status to offline
      if (userData?.data?.userId) {
        setUserStatus((prev) => ({
          ...prev,
          [userData.data.userId]: "offline",
        }));
      }
    });

    // Handle window/tab close
    const handleBeforeUnload = () => {
      if (userData?.data?.userId) {
        newSocket.emit("user_disconnected", { userId: userData.data.userId });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Listen for user status changes
    newSocket.on("user_status_changed", ({ userId, status }) => {
      console.log("Status changed for user:", userId, "to:", status);
      setUserStatus((prev) => ({
        ...prev,
        [userId]: status,
      }));
    });

    // Handle incoming messages
    newSocket.on("receive_message", ({ message }) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Handle message sent confirmation
    newSocket.on("message_sent", ({ message }) => {
      console.log("Message sent:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Handle message errors
    newSocket.on("message_error", ({ error }) => {
      console.error("Message error:", error);
    });

    setSocket(newSocket);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (userData?.data?.userId) {
        newSocket.emit("user_disconnected", { userId: userData.data.userId });
      }
      newSocket.disconnect();
      setMessages([]); // Clear messages on cleanup
      setUserStatus({}); // Clear user status on cleanup
    };
  }, [userData?.data?.userId]); // Re-run effect when userData.data.userId changes

  return (
    <SocketContext.Provider
      value={{ socket, userStatus, sendMessage, messages }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
