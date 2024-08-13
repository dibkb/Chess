import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";
import { router } from "./routes";
import { Socket } from "./types";
import { SocketManagerInstance } from "./SocketManger";
const PORT = 3000;

const app = express();
// default middlewares
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// testing endpoint
app.get("/test", (req, res) => {
  return res.send("Test endpoint working 🎃");
});
app.use("/api", router);
const expressServer = app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});
// socket server
const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});
// connection
console.log(SocketManagerInstance.getAllOnlineusers());
io.on("connection", (socket) => {
  // emit-all online users
  socket.on(Socket.Connect, (user_id) => {
    SocketManagerInstance.connectUser(user_id, socket.id);
    const onlineUsers = SocketManagerInstance.getAllOnlineusers();
    console.log("c0nnet", onlineUsers);
    io.emit(Socket.OnlinePlayers, onlineUsers);
  });
  // message
  socket.on(Socket.Message, (mess) => {
    socket.broadcast.emit(Socket.Message, mess);
  });
  // typing
  socket.on(Socket.Typing, () => {
    socket.broadcast.emit(Socket.Typing);
  });
  // not-typing
  socket.on(Socket.StoppedTyping, () => {
    socket.broadcast.emit(Socket.StoppedTyping);
  });
  // challenge
  socket.on(Socket.Challenge, ({ user_id, opponent_id }) => {
    socket.broadcast.emit(Socket.Challenge, { user_id, opponent_id });
  });
  // disconnect
  socket.on("disconnect", () => {
    SocketManagerInstance.disconnectSocket(socket.id);
    // all online users
    const onlineUsers = SocketManagerInstance.getAllOnlineusers();
    console.log("disconnect", onlineUsers);
    io.emit(Socket.OnlinePlayers, onlineUsers);
  });
});
// prisma client
export const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  console.log("Closing Prisma Client connection");
  await prisma.$disconnect();
  console.log("Prisma Client connection closed");
  expressServer.close(() => {
    console.log("Server shut down gracefully");
    process.exit(0);
  });
});
