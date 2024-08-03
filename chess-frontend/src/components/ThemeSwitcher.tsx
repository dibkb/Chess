import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "../svg/MoonIcon";
import { SunIcon } from "../svg/SunIcon";

export function ThemeSwitcher({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const onChangeHandler = (e: boolean) => {
    e ? setTheme("dark") : setTheme("light");
  };
  return (
    <>
      <Switch
        defaultSelected
        size="md"
        color="success"
        onValueChange={onChangeHandler}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      ></Switch>

      {children}
    </>
  );
}
