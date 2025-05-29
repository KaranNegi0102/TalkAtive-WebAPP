import { Server } from "socket.io";
import User from "../../src/app/utils/models/UserSchema.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Store connected users
  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User Connected hogya bhaiiiiii : ", socket.id);

    // Handle user connection with userId
    socket.on("user_connected", async ({ userId }) => {
      try {
        // Update user status to online in database
        await User.findByIdAndUpdate(userId, { status: "online" });

        connectedUsers.set(userId, socket.id);
        console.log(
          `User ${userId} connected with socket ab toh yeh bhi hogyaaaa ${socket.id}`
        );

        // Broadcast to all clients that a new user has connected
        io.emit("user_joined", { userId });

        // Broadcast updated user status
        io.emit("user_status_changed", { userId, status: "online" });
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });

    // Handle disconnection
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
