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
    dark: "#92897D",
    light: "#ABA093",
  },
  "New York": {
    dark: "#92897D",
    light: "#ABA093",
  },
  Rio: {
    dark: "#92897D",
    light: "#ABA093",
  },
  Sydney: {
    dark: "#92897D",
    light: "#ABA093",
  },
};
export { GameThemeValues };
