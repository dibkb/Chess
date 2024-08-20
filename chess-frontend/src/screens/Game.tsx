import React, { useState } from "react";
import { Chess, Square } from "chess.js";
import { Piece } from "../types/piece";
import { PIECES } from "../chess_assets/minamal";
import { cn, Select, SelectItem } from "@nextui-org/react";
export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
const Game = () => {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [from, setFrom] = useState<null | Square>(null);
  const [blackFacing, setBlackFacing] = useState(true);
  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-12">
      <div className="col-span-3 flex items-center justify-center">
        <Select label="Select an animal" className="max-w-xs">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
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
                          (i + j) % 2 === 0 ? "bg-[#ABA093]" : "bg-[#92897D]"
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
                    {String.fromCharCode(49 + i)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col absolute left-[-48px] top-0 cutive font-bold text-foreground-500 text-lg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-24 flex items-center justify-center rotate-180"
                  >
                    {String.fromCharCode(56 - i)}
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
