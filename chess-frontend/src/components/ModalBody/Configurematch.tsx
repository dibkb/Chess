import { cn, Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  ChessGameType,
  ChessPiece,
  Configuration,
  gameTheme,
} from "../../types/piece";
import {
  GamePieceOptions,
  GameThemeOptions,
  GameTimeOPtions,
} from "../../data/gameTheme";

interface ConfigurematchInterface {
  configuration: Configuration;
  setConfiguration: Dispatch<SetStateAction<Configuration>>;
}
const Configurematch = ({
  configuration,
  setConfiguration,
}: ConfigurematchInterface) => {
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
  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const time = e.target.value as unknown as ChessGameType;
    setConfiguration((prev) => ({ ...prev, time }));
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
        <Select
          defaultSelectedKeys={"all"}
          value={configuration.time}
          label="Choose game"
          className=""
          onChange={handleGameChange}
        >
          {GameTimeOPtions.map((theme) => (
            <SelectItem key={theme.key}>{theme.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export { Configurematch };
