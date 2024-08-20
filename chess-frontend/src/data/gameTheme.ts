import { type gameTheme } from "../types/piece";

interface GameSelect {
  key: gameTheme;
  label: gameTheme;
}
export const GameThemeOptions: GameSelect[] = [
  { key: "Milan", label: "Milan" },
  { key: "Barcelona", label: "Barcelona" },
  { key: "New York", label: "New York" },
  { key: "Rio", label: "Rio" },
  { key: "Sydney", label: "Sydney" },
];
