import React, { useState } from "react";
import { Chess, Square } from "chess.js";
const Game = () => {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [from, setFrom] = useState<null | Square>(null);
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <section>
        <main className="relative">
          {board.map((row, i) => {
            return (
              <div key={i} className="flex">
                {row.map((square, j) => {
                  return (
                    <div
                      key={j}
                      className={`w-24 h-24 ${
                        (i + j) % 2 === 0 ? "bg-[#ABA093]" : "bg-[#92897D]"
                      }`}
                    >
                      <div className="w-full justify-center flex h-full">
                        <div className="h-full justify-center flex flex-col">
                          {square?.color}
                          {square?.square}
                          {square?.type}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="flex flex-col absolute left-[-48px] top-0 cutive font-bold text-foreground-500 text-lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-24 flex items-center justify-center"
              >
                {String.fromCharCode(56 - i)}
              </div>
            ))}
          </div>
        </main>
        {/*  row numbering */}
        <div className="flex relative cutive text-foreground-500 text-lg">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-24 h-12 flex items-center justify-center">
              {String.fromCharCode(i + 97)}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export { Game };
