import http from "http";
import { initializeSocket } from "./socket/socket.js";
import connectionDB from "../src/app/utils/database/dbConnection.js";
import "dotenv/config";

const server = http.createServer();

// Initialize socket first
initializeSocket(server);

// Then connect to database
connectionDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`WebSocket server running on http://localhost:${PORT}`);
});
