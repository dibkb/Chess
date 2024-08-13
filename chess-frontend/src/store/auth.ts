import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Types, type AuthState, type User } from "../types/zustand";
import { io, Socket } from "socket.io-client";
import { SocketMessage } from "../types/socket";

const socket: Socket = io("ws://localhost:3000");

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // token state
      token: null,
      clearToken: () => set({ token: null }),
      setToken: (token: string) => set({ token: token }),
      //  signed-in user-state
      user: null,
      setUser: (newUser: User) => set({ user: newUser }),
      clearUser: () => set({ user: null }),
      isConnected: false,
      socketId: null,
      connect: () => {
        socket.connect();
        socket.on("connect", () => {
          set({ isConnected: true, socketId: socket.id });
        });
        socket.on("disconnect", () => {
          set({ isConnected: false, socketId: null });
        });
      },
      disconnect: () => {
        socket.disconnect();
      },
      sendMessage: ({ socketEvent, data }) => {
        if (get().isConnected) {
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
