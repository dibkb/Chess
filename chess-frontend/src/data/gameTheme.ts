import { ChessPiece, type gameTheme } from "../types/piece";

interface GameSelect {
  key: gameTheme;
  label: gameTheme;
}
export const GameThemeOptions: GameSelect[] = [
  { key: "Milan", label: "Milan" },
  { key: "Barcelona", label: "Barcelona" },
  { key: "Geneva", label: "Geneva" },
  { key: "New York", label: "New York" },
  { key: "Munich", label: "Munich" },
  { key: "Osaka", label: "Osaka" },
  { key: "Dublin", label: "Dublin" },
  { key: "Manchester", label: "Manchester" },
  { key: "Rio", label: "Rio" },
  { key: "Sydney", label: "Sydney" },
  { key: "Tokyo", label: "Tokyo" },
  { key: "Reykjavík", label: "Reykjavík" },
];
interface PieceSelect {
  key: ChessPiece;
  label: ChessPiece;
}
export const GamePieceOptions: PieceSelect[] = [
  { key: "Classic", label: "Classic" },
  { key: "Astrals", label: "Astrals" },
  { key: "Spirits", label: "Spirits" },
  { key: "Norsemen", label: "Norsemen" },
  { key: "Mythicons", label: "Mythicons" },
  { key: "Gothic", label: "Gothic" },
];
