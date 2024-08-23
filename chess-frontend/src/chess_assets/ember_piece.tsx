import { ReactNode } from "react";
import { Piece } from "../types/piece";

const ChessPiece = ({ piece }: { piece: Piece }) => {
  const imagePath = `/src/assets/piece/ember/${piece}.png`;
  return (
    <img
      src={new URL(imagePath, import.meta.url).href}
      alt={`Chess piece ${piece}`}
    />
  );
};

const PIECES_EMBER: Record<Piece, ReactNode> = {
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

export { PIECES_EMBER };
