import { type gameTheme } from "../types/piece";

interface GameSelect {
  key: gameTheme;
  label: gameTheme;
}
export const GameThemeOptions: GameSelect[] = [
  { key: "Milan", label: "Milan" },
  { key: "Barcelona", label: "Barcelona" },
  { key: "Geneva", label: "Geneva" },
  { key: "New York", label: "New York" },
  { key: "Manchester", label: "Manchester" },
  { key: "Rio", label: "Rio" },
  { key: "Sydney", label: "Sydney" },
  { key: "Tokyo", label: "Tokyo" },
  { key: "Reykjavík", label: "Reykjavík" },
];
