import { ChessPiece, Piece } from "../types/piece";
import { PIECES_ASTRALS } from "./astral_piece";
import { PIECES_BRASS } from "./brass_piece";
import { PIECES_CLASSIC } from "./classic_piece";
import { PIECES_EMBER } from "./ember_piece";
import { PIECES_GOTHIC } from "./gothic_piece";
import { PIECES_MYTHICONS } from "./mythicons_piece";
import { PIECES_NORSEMEN } from "./norsemen_piece";
import { PIECES_SPIRITS } from "./spirits_piece";

type Theme = {
  [key in ChessPiece]: Record<Piece, React.ReactNode>;
};
const GamePiece: Theme = {
  Classic: PIECES_CLASSIC,
  Ember: PIECES_EMBER,
  Brass: PIECES_BRASS,
  Spirits: PIECES_SPIRITS,
  Astrals: PIECES_ASTRALS,
  Norsemen: PIECES_NORSEMEN,
  Mythicons: PIECES_MYTHICONS,
  Gothic: PIECES_GOTHIC,
};
export { GamePiece };
