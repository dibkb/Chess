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
  | "Osaka"
  | "Munich"
  | "Dublin"
  | "Geneva"
  | "Sydney"
  | "Tokyo"
  | "Manchester"
  | "Reykjavík";
type ChessPiece =
  | "Classic"
  | "Ember"
  | "Spirits"
  | "Astrals"
  | "Norsemen"
  | "Mythicons"
  | "Gothic";
export { type gameTheme, type ChessPiece };
