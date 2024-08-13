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
  socketId: string | null;
  clearUser: () => void;
  connect: () => void;
  disconnect: () => void;
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
