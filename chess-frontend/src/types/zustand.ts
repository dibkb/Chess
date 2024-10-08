import { Socket } from "socket.io-client";
import { SocketMessage } from "./socket";
import { Chat } from "./chat";
import { ChessPiece, gameTheme } from "./piece";

interface User {
  id: string;
  username?: string;
  profilePic?: string;
}
interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  user: User | null;
  setUser: (user: User) => void;
  isConnected: boolean;
  isLoggedIn: boolean;
  socketId: string | null;
  clearUser: () => void;
  connect: () => void;
  initSocket: () => void;
  disconnect: () => void;
  logoutUser: () => void;
  logIn: () => void;
  sendMessage: ({
    socketEvent,
    data,
  }: {
    socketEvent: SocketMessage;
    data: unknown;
  }) => void;
}
interface SocketUser extends User {
  socketId: string;
}
interface SocketStore {
  gameTheme: gameTheme;
  setGameTheme: (theme: gameTheme) => void;
  piece: ChessPiece;
  setPiece: (piece: ChessPiece) => void;
  blackFacing: boolean;
  flipFacing: () => void;
  initGame: (data: { color: "b" | "w"; theme?: gameTheme }) => void;
  socket: Socket | null;
  onlineUsers: Map<string, SocketUser> | null;
  setOnlineUsers: (data: Map<string, SocketUser>) => void;
}
interface MessageStore {
  messageHistory: Chat[];
  addMessage: (message: Chat) => void;
  clearMessages: () => void;
}
enum Types {
  AuthStore = "chessmate-auth-store",
}
export {
  type AuthState,
  type User,
  Types,
  type SocketStore,
  type SocketUser,
  type MessageStore,
};
