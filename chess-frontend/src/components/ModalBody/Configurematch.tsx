import { cn, Input, Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { ChessPiece, Configuration, gameTheme } from "../../types/piece";
import { GamePieceOptions, GameThemeOptions } from "../../data/gameTheme";

const Configurematch = () => {
  const [configuration, setConfiguration] = useState<Configuration>({
    color: "w",
    venue: "Milan",
    piece: "Classic",
    time: "Rapid Rumble",
  });
  const selectColorHandler = (color: Configuration["color"]) => {
    setConfiguration((prev) => ({ ...prev, color }));
  };
  const handleVenueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const venue = e.target.value as unknown as gameTheme;
    setConfiguration((prev) => ({ ...prev, venue }));
  };
  const handlePieceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const piece = e.target.value as unknown as ChessPiece;
    setConfiguration((prev) => ({ ...prev, piece }));
  };
  return (
    <div className="flex flex-col gap-6 justify-center">
      <div className="flex flex-col gap-2">
        <p className="cutive text-lg">I want to play as</p>
        <div className="flex gap-6">
          <span
            onClick={() => selectColorHandler("w")}
            className={cn(
              "w-20 h-20 rounded-lg bg-white border-4 cursor-pointer flex items-center justify-center cutive text-black",
              configuration?.color === "w" && `border-blue-500`
            )}
          >
            White
          </span>
          <span
            onClick={() => selectColorHandler("b")}
            className={cn(
              "w-20 h-20 rounded-lg bg-black border-4 border-black cursor-pointer flex items-center justify-center cutive text-white",
              configuration?.color === "b" && `border-blue-500`
            )}
          >
            Black
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="cutive text-lg">I want to play in</p>
        <Select
          defaultSelectedKeys={"all"}
          value={configuration.venue}
          label="Choose venue"
          className=""
          onChange={handleVenueChange}
        >
          {GameThemeOptions.map((theme) => (
            <SelectItem key={theme.key}>{theme.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <p className="cutive text-lg">I want to plain with</p>
        <Select
          defaultSelectedKeys={"all"}
          value={configuration["piece"]}
          label="Choose pieces"
          onChange={handlePieceChange}
        >
          {GamePieceOptions.map((theme) => (
            <SelectItem key={theme.key}>{theme.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <p className="cutive text-lg">I want to play for</p>
        <Input type="number" />
      </div>
    </div>
  );
};

export { Configurematch };
