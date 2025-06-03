import { Server } from "socket.io";
import User from "../utils/models/UserSchema.js";
import Message from "../utils/models/Message.js"
import "dotenv/config";


export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000" || "https://talk-ative-web-app.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  // Store connected users
  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Handle user connection with userId
    socket.on("user_connected", async ({ userId }) => {
      try {
        console.log("this is user id in socket.js backend", userId);

        if (!userId) {
          console.error("No userId provided for connection");
          return;
        }

        // Update user status to online in database
        await User.findByIdAndUpdate(userId, { status: "online" });

        // Store the socket connection
        connectedUsers.set(userId, socket.id);
        console.log(`User ${userId} connected with socket ${socket.id}`);

        // Broadcast to all clients that a new user has connected
        io.emit("user_joined", { userId });

        // Broadcast updated user status
        io.emit("user_status_changed", { userId, status: "online" });
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });

    // Handle sending messages
    socket.on("send_message", async ({ senderId, receiverId, message }) => {
      try {
        // Create new message in database
        const newMessage = await Message.create({
          sender: senderId,
          receiver: receiverId,
          message,
          timestamp: new Date(),
        });

        // Get receiver's socket ID
        const receiverSocketId = connectedUsers.get(receiverId);

        // If receiver is online, send message to them
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", {
            message: newMessage,
          });
        }

        // Send confirmation to sender
        socket.emit("message_sent", {
          message: newMessage,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("message_error", {
          error: "Failed to send message",
        });
      }
    });

    // Handle explicit user disconnection
    socket.on("user_disconnected", async ({ userId }) => {
      try {
        if (!userId) {
          console.error("No userId provided for disconnection");
          return;
        }

        // Update user status to offline in database
        await User.findByIdAndUpdate(userId, { status: "offline" });

        // Remove from connected users
        connectedUsers.delete(userId);
        console.log(`User ${userId} explicitly disconnected`);

        // Broadcast status change
        io.emit("user_status_changed", { userId, status: "offline" });
      } catch (error) {
        console.error("Error updating user status on disconnect:", error);
      }
    });

    // Handle socket disconnection
    socket.on("disconnect", async () => {
      // Find and remove the disconnected user
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          try {
            // Update user status to offline in database
            await User.findByIdAndUpdate(userId, { status: "offline" });

            connectedUsers.delete(userId);
            console.log(`User ${userId} disconnected`);

            // Broadcast user left and status change
            io.emit("user_left", { userId });
            io.emit("user_status_changed", { userId, status: "offline" });
          } catch (error) {
            console.error("Error updating user status on disconnect:", error);
          }
          break;
        }
      }
    });
  });

  return io;
};
