import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useState,
} from "react";
import { Chess, Square } from "chess.js";
import { Piece } from "../types/piece";
import { PIECES } from "../chess_assets/minamal";
import { cn } from "@nextui-org/react";
import { GameOptions } from "../components/GameOptions";
import { useSocketStore } from "../store/auth";
import { GameThemeValues } from "../chess_assets/GameTheme";

const Game = () => {
  const { blackFacing, gameTheme } = useSocketStore();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [from, setFrom] = useState<null | Square>(null);

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-12">
      <div className="col-span-3 flex items-center justify-center flex-col gap-3">
        <GameOptions />
      </div>
      <div className="col-span-9 flex items-center justify-center">
        <section className="w-min">
          <main className={cn("relative", blackFacing && "rotate-180")}>
            {board.map((row, i) => {
              return (
                <div key={i} className="flex">
                  {row.map((square, j) => {
                    const number = `${square?.color}${square?.type}` as Piece;
                    return (
                      <div
                        key={j}
                        className={`w-24 h-24 ${
                          (i + j) % 2 === 0
                            ? `bg-[${GameThemeValues[gameTheme].light}]`
                            : `bg-[${GameThemeValues[gameTheme].dark}]`
                        }`}
                      >
                        <div className="w-full justify-center flex h-full">
                          <div
                            className={cn(
                              "h-full justify-center flex flex-col",
                              blackFacing && "rotate-180"
                            )}
                          >
                            {PIECES[number]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {blackFacing ? (
              <div className="flex flex-col absolute right-[-48px] top-0 cutive font-bold text-foreground-500 text-lg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-24 flex items-center justify-center rotate-180"
                  >
                    {8 - i}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col absolute left-[-48px] top-0 cutive font-bold text-foreground-500 text-lg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-24 flex items-center justify-center"
                  >
                    {8 - i}
                  </div>
                ))}
              </div>
            )}
          </main>
          {/*  row numbering */}
          {blackFacing ? (
            <div className="flex relative cutive text-foreground-500 text-lg">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-12 flex items-center justify-center"
                >
                  {String.fromCharCode(104 - i)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex relative cutive text-foreground-500 text-lg">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-12 flex items-center justify-center"
                >
                  {String.fromCharCode(i + 97)}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export { Game };
