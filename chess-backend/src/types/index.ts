enum Types {
  ACCESS_TOKEN = "chessmate__accesstoken",
}
enum Socket {
  Connect = "Connect",
  Message = "Message",
  Disconnect = "Disconnect",
  Challenge = "Challenge",
  Typing = "Typing",
  StoppedTyping = "StoppedTyping",
  OnlinePlayers = "OnlinePlayers",
  LogoutUser = "LogoutUser",
}
interface OnlinePlayer {
  id: string;
  socket_id: string;
}
export { Types, OnlinePlayer, Socket };
