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
  clearUser: () => void;
}

enum Types {
  AuthStore = "chessmate-auth-store",
}
export { type AuthState, type User, Types };
