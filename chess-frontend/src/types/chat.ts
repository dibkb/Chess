interface Chat {
  owner: "other" | "me";
  socketId?: string;
  message: string;
}
export type { Chat };
