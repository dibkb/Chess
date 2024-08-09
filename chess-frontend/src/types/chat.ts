import { User } from "./zustand";

interface Chat {
  owner: "other" | "me";
  user?: User;
  message: string;
}
export type { Chat };
