import React, { useState } from "react";
import { Chess, Square } from "chess.js";
import { Piece } from "../types/piece";
import { cn } from "@nextui-org/react";
import { GameOptions } from "../components/GameOptions";
import { useSocketStore } from "../store/auth";
import { GameThemeValues } from "../chess_assets/GameTheme";
import { GamePiece } from "../chess_assets/Pieces";

const Game = () => {
  const { blackFacing, gameTheme, piece } = useSocketStore();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [from, setFrom] = useState<null | Square>(null);
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col my-6 lg:my-0 lg:grid lg:grid-cols-12 gap-y-8 lg:gap-x-4">
      <div className="lg:col-span-3 flex items-center justify-center flex-col gap-3  row-span-2 h-auto lg:row-span-1 order-2 lg:order-1">
        <GameOptions />
      </div>
      <div className="lg:col-span-9 flex items-center justify-center row-span-4 lg:row-span-1 h-auto order-1 lg:order-2">
        <section className="w-min">
          <main className={cn("relative", blackFacing && "rotate-180")}>
            {board.map((row, i) => {
              const color = GameThemeValues[gameTheme];
              const gamePiece = GamePiece[piece];
              return (
                <div key={i} className="flex">
                  {row.map((square, j) => {
                    const number = `${square?.color}${square?.type}` as Piece;
                    return (
                      <div
                        key={j}
                        className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24`}
                        style={{
                          backgroundColor:
                            (i + j) % 2 === 0 ? color.light : color.dark,
                        }}
                      >
                        <div className="w-full justify-center flex h-full">
                          <div
                            className={cn(
                              "h-full justify-center flex flex-col",
                              blackFacing && "rotate-180"
                            )}
                          >
                            {gamePiece[number]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {blackFacing ? (
              <div className="flex flex-col absolute right-[-40px] sm:right-[-64px] md:right-[-80px] lg:right-[-96px] top-0 cutive font-bold text-foreground-500 text-lg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center rotate-180"
                  >
                    {8 - i}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col absolute left-[-40px] sm:left-[-64px] md:left-[-80px] lg:left-[-96px] top-0 cutive font-bold text-foreground-500 text-lg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
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
                  className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
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
                  className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
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
