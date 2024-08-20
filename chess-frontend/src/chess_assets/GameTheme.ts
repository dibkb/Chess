import { gameTheme } from "../types/piece";

type Theme = {
  [key in gameTheme]: {
    dark: string;
    light: string;
  };
};
const GameThemeValues: Theme = {
  Milan: {
    dark: "#92897D",
    light: "#ABA093",
  },
  Barcelona: {
    dark: "#796CAD",
    light: "#B7B7D9",
  },
  "New York": {
    dark: "#4A6572",
    light: "#627D87",
  },
  Manchester: {
    dark: "#6C6478",
    light: "#877C8E",
  },
  Reykjavík: {
    dark: "#6A7285",
    light: "#838CA2",
  },
  Geneva: {
    dark: "#69777F",
    light: "#84929A",
  },
  Rio: {
    dark: "#78BBFF",
    light: "#F2F2FF",
  },
  Sydney: {
    dark: "#7A706A",
    light: "#B3ADA6",
  },
  Tokyo: {
    dark: "#6E7F68",
    light: "#8A9C82",
  },
};
export { GameThemeValues };
