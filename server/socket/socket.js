import { Server } from "socket.io";

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
    socket.on("user_connected", ({ userId }) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ab toh yeh bhi hogyaaaa ${socket.id}`);

      // Broadcast to all clients that a new user has connected
      io.emit("user_joined", { userId });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      // Find and remove the disconnected user
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          io.emit("user_left", { userId });
          break;
        }
      }
    });
  });

  return io;
};
