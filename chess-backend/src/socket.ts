import { Server } from "socket.io";
import { ChallengeType, Socket } from "./types";
import { SocketManagerInstance } from "./SocketManger";

export const setUpSocketServer = (io: Server) => {
  io.on("connection", (socket) => {
    // emit-all online users
    socket.on(Socket.Connect, (user_id) => {
      if (SocketManagerInstance.userOnline(user_id)) {
        // user is already connected remove old socket
        const oldSocket = SocketManagerInstance.getUserSocket(user_id);
        if (oldSocket) {
          io.to(oldSocket).emit(Socket.LogoutUser);
        }
      }
      console.log("new user", user_id, socket.id);
      if (user_id) {
        SocketManagerInstance.connectUser(user_id, socket.id);
        const onlineUsers = SocketManagerInstance.getAllOnlineusers();
        console.log("c0nnet", onlineUsers);
        io.emit(Socket.OnlinePlayers, onlineUsers);
      }
    });
    // message
    socket.on(Socket.Message, (mess) => {
      socket.broadcast.emit(Socket.Message, {
        message: mess,
        socketId: socket.id,
      });
    });
    // typing
    socket.on(Socket.Typing, () => {
      socket.broadcast.emit(Socket.Typing, {
        message: Socket.Typing,
        socketId: socket.id,
      });
    });
    // not-typing
    socket.on(Socket.StoppedTyping, () => {
      socket.broadcast.emit(Socket.StoppedTyping, {
        message: Socket.StoppedTyping,
        socketId: socket.id,
      });
    });
    // challenge
    socket.on(Socket.Challenge, (data: ChallengeType) => {
      const challengedUser = data.opponent;
      const challengedSocket =
        SocketManagerInstance.getUserSocket(challengedUser);
      const challengerUser = SocketManagerInstance.getUserFromSocket(socket.id);
      if (challengedSocket && challengerUser) {
        io.to(challengedSocket).emit(Socket.Challenge, {
          challenger: {
            socketId: socket.id,
            userId: challengerUser,
          },
          ...data.configuration,
        });
      }
    });
    // disconnect
    socket.on("disconnect", () => {
      SocketManagerInstance.disconnectSocket(socket.id);
      // all online users
      const onlineUsers = SocketManagerInstance.getAllOnlineusers();
      console.log("After disconnect online users", onlineUsers);
      io.emit(Socket.OnlinePlayers, onlineUsers);
    });
  });
};
