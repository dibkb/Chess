export type Piece =
  | "bb"
  | "bk"
  | "bn"
  | "bp"
  | "bq"
  | "br"
  | "wb"
  | "wk"
  | "wn"
  | "wp"
  | "wq"
  | "wr";
type gameTheme =
  | "Milan"
  | "Barcelona"
  | "New York"
  | "Rio"
  | "Geneva"
  | "Sydney"
  | "Tokyo"
  | "Manchester"
  | "Reykjavík";
type ChessPiece = "Spirits" | "Astrals" | "Norsemen" | "Mythicons";
export { type gameTheme, type ChessPiece };
