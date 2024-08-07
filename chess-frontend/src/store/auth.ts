import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Types, type AuthState, type User } from "../types/zustand";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // token state
      token: null,
      clearToken: () => set({ token: null }),
      setToken: (token: string) => set({ token: token }),
      //  signed-in user-state
      user: null,
      setUser: (newUser: User) => set({ user: newUser }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: Types.AuthStore,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
