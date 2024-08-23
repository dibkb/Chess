import { ReactNode } from "react";
import { Piece } from "../types/piece";

const ChessPiece = ({ piece }: { piece: Piece }) => {
  const imagePath = `/src/assets/piece/classic/${piece}.png`;
  return (
    <img
      src={new URL(imagePath, import.meta.url).href}
      alt={`Chess piece ${piece}`}
    />
  );
};

export default ChessPiece;
const PIECES_CLASSIC: Record<Piece, ReactNode> = {
  // black
  bb: <ChessPiece piece="bb" />,
  bk: <ChessPiece piece="bk" />,
  bn: <ChessPiece piece="bn" />,
  bp: <ChessPiece piece="bp" />,
  bq: <ChessPiece piece="bq" />,
  br: <ChessPiece piece="br" />,
  // white
  wb: <ChessPiece piece="wb" />,
  wk: <ChessPiece piece="wk" />,
  wn: <ChessPiece piece="wn" />,
  wp: <ChessPiece piece="wp" />,
  wq: <ChessPiece piece="wq" />,
  wr: <ChessPiece piece="wr" />,
};

export { PIECES_CLASSIC };
