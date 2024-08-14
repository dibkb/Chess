import { Socket } from "socket.io-client";
import { SocketMessage } from "./socket";

interface User {
  id: string;
  username: string;
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

enum Types {
  AuthStore = "chessmate-auth-store",
}
export { type AuthState, type User, Types };
