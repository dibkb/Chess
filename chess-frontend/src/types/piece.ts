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
  | "Brass"
  | "Ember"
  | "Spirits"
  | "Astrals"
  | "Norsemen"
  | "Mythicons"
  | "Gothic";
interface Configuration {
  color: "w" | "b";
  venue: gameTheme;
  piece: ChessPiece;
  // time in seconds
  time: ChessGameType;
}
type ChessGameType = "Flash Chess" | "Rapid Rumble" | "Zen Chess";
export {
  type gameTheme,
  type ChessPiece,
  type Configuration,
  type ChessGameType,
};
