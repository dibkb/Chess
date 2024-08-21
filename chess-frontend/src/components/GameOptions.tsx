import { Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { GameThemeOptions, GamePieceOptions } from "../data/gameTheme";
import { useSocketStore } from "../store/auth";
import { ChessPiece, gameTheme } from "../types/piece";
import { Reverse } from "../svg/Reverse";

export const GameOptions = () => {
  const { gameTheme, setGameTheme, flipFacing, piece, setPiece } =
    useSocketStore();
  const handleVenueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value as unknown as gameTheme;
    setGameTheme(theme);
  };
  const handlePieceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const piece = e.target.value as unknown as ChessPiece;
    setPiece(piece);
  };
  return (
    <>
      <div
        onClick={flipFacing}
        className="px-8 py-2 hover:bg-foreground-100 cursor-pointer rounded-md flex flex-col justify-between gap-2 items-center select-none"
      >
        <Reverse className="size-9" />
        <p className="text-xs text-foreground-400">Flip board</p>
      </div>
      <Select
        defaultSelectedKeys={"all"}
        value={gameTheme}
        label="Choose venue"
        className="max-w-xs"
        onChange={handleVenueChange}
      >
        {GameThemeOptions.map((theme) => (
          <SelectItem key={theme.key}>{theme.label}</SelectItem>
        ))}
      </Select>
      <Select
        defaultSelectedKeys={"all"}
        value={piece}
        label="Choose pieces"
        className="max-w-xs"
        onChange={handlePieceChange}
      >
        {GamePieceOptions.map((theme) => (
          <SelectItem key={theme.key}>{theme.label}</SelectItem>
        ))}
      </Select>
    </>
  );
};
