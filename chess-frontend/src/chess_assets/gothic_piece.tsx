import { Piece } from "../types/piece";
import { BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from "./gothic";

const PIECES_GOTHIC: Record<Piece, React.ReactNode> = {
  // black
  bb: <BB />,
  bk: <BK />,
  bn: <BN />,
  bp: <BP />,
  bq: <BQ />,
  br: <BR />,
  // white
  wb: <WB />,
  wk: <WK />,
  wn: <WN />,
  wp: <WP />,
  wq: <WQ />,
  wr: <WR />,
};
export { PIECES_GOTHIC };
