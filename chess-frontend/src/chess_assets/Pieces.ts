import { ChessPiece, Piece } from "../types/piece";
import { PIECES_ASTRALS } from "./astral_piece";
import { PIECES_GOTHIC } from "./gothic_piece";
import { PIECES_MYTHICONS } from "./mythicons_piece";
import { PIECES_NORSEMEN } from "./norsemen_piece";
import { PIECES_SPIRITS } from "./spirits_piece";

type Theme = {
  [key in ChessPiece]: Record<Piece, React.ReactNode>;
};
const GamePiece: Theme = {
  Spirits: PIECES_SPIRITS,
  Astrals: PIECES_ASTRALS,
  Norsemen: PIECES_NORSEMEN,
  Mythicons: PIECES_MYTHICONS,
  Gothic: PIECES_GOTHIC,
};
export { GamePiece };
