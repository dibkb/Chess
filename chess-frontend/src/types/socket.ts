enum SocketMessage {
  Connect = "Connect",
  Message = "Message",
  Disconnect = "Disconnect",
  Challenge = "Challenge",
  Typing = "Typing",
  StoppedTyping = "StoppedTyping",
  OnlinePlayers = "OnlinePlayers",
  LogoutUser = "LogoutUser",
}
type OnlinePlayers = [string, string];
export { SocketMessage, type OnlinePlayers };
