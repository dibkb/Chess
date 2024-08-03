import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "../svg/MoonIcon";
import { SunIcon } from "../svg/SunIcon";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const onChangeHandler = (e: boolean) => {
    e ? setTheme("dark") : setTheme("light");
  };
  return (
    <nav className="flex justify-between container mx-auto py-4">
      <p className="elsie-regular text-2xl">Chessmate</p>
      <ul className="flex items-center gap-3">
        <li>
          <a
            href="/join"
            className="px-6 rounded-md py-2 cursor-pointer hover:bg-default-100"
          >
            Login
          </a>
        </li>
        <li>
          <Switch
            defaultSelected={theme === "dark" ? true : false}
            size="md"
            color="success"
            onValueChange={onChangeHandler}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <MoonIcon className={className} />
              ) : (
                <SunIcon className={className} />
              )
            }
          />
        </li>
      </ul>
    </nav>
  );
}
