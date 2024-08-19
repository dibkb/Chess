import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Types,
  type AuthState,
  type User,
  type SocketStore,
  MessageStore,
} from "../types/zustand";
import { io } from "socket.io-client";
import { SocketMessage } from "../types/socket";

// Create a separate store for non-persisted state
export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  onlineUsers: null,
  setOnlineUsers(data) {
    set({
      onlineUsers: data,
    });
  },
}));

export const useMessageStore = create<MessageStore>((set, get) => ({
  messageHistory: [],
  addMessage: (message) => {
    set((state) => ({
      messageHistory: [...state.messageHistory, message],
    }));
  },
  clearMessages: () => set({ messageHistory: [] }),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // token state
      token: null,
      clearToken: () => set({ token: null }),
      setToken: (token: string) => set({ token }),
      //  signed-in user-state
      user: null,
      setUser: (newUser: User) => set({ user: newUser }),
      clearUser: () => set({ user: null }),
      isConnected: false,
      isLoggedIn: false,
      logIn: () => set({ isLoggedIn: true }),
      logoutUser: () => {
        set({
          isConnected: false,
          user: null,
          token: null,
          socketId: null,
          isLoggedIn: false,
        });
      },
      socketId: null,
      initSocket: () => {
        const socket = io("ws://localhost:3000");
        useSocketStore.setState({ socket });
        socket.on("connect", () => {
          set({ isConnected: true, socketId: socket.id });
          socket.emit(SocketMessage.Connect, get().user?.id);
        });

        socket.on("disconnect", () => {
          set({ isConnected: false, socketId: null });
        });
      },
      connect: () => {
        const { socket } = useSocketStore.getState();
        if (!socket) {
          get().initSocket();
        } else {
          socket.connect();
        }
      },
      disconnect: () => {
        const { socket } = useSocketStore.getState();
        socket?.disconnect();
        set({
          isConnected: false,
          socketId: null,
        });
      },
      sendMessage: ({ socketEvent, data }) => {
        const { socket } = useSocketStore.getState();
        if (get().isConnected && socket) {
          socket.emit(socketEvent, data);
        }
      },
    }),
    {
      name: Types.AuthStore,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
