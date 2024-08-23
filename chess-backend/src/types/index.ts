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
interface Configuration {
  color: "w" | "b";
  venue: string;
  piece: string;
  // time in seconds
  time: string;
}
interface ChallengeType {
  opponent: string;
  configuration: Configuration;
}
export { Types, OnlinePlayer, Socket, ChallengeType };
