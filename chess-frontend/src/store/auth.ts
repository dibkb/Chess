import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Types } from "../types/enum";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      clearToken: () => set({ token: null }),
      setToken: (token: string) => set({ token: token }),
    }),
    {
      name: Types.AuthStore,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
