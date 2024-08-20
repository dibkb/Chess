import { Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { GameThemeOptions } from "../data/gameTheme";
import { useSocketStore } from "../store/auth";
import { gameTheme } from "../types/piece";
import { Reverse } from "../svg/Reverse";

export const GameOptions = () => {
  const { gameTheme, setGameTheme, flipFacing } = useSocketStore();
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value as unknown as gameTheme;
    setGameTheme(theme);
  };
  return (
    <>
      <div
        onClick={flipFacing}
        className="p-4 hover:bg-foreground-100 cursor-pointer rounded-md"
      >
        <Reverse className="size-9" />
      </div>
      <Select
        defaultSelectedKeys={"all"}
        value={gameTheme}
        label="Choose venue"
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {GameThemeOptions.map((theme) => (
          <SelectItem key={theme.key}>{theme.label}</SelectItem>
        ))}
      </Select>
    </>
  );
};
