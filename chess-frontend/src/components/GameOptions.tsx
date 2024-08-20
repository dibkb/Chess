import { Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { GameThemeOptions } from "../data/gameTheme";
import { useSocketStore } from "../store/auth";
import { gameTheme } from "../types/piece";

export const GameOptions = () => {
  const { setGameTheme } = useSocketStore();
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target as unknown as gameTheme;
    setGameTheme(theme);
  };
  return (
    <>
      <Select
        label="Select an animal"
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
