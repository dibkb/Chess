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
    <header className="py-4 border-b border-default-200">
      <nav className="container mx-auto flex justify-between items-center">
        <p className="elsie-regular text-2xl">Chessmate 👋</p>
        <ul className="flex items-center gap-3">
          <li>
            <a
              href="/join"
              className="px-6 py-2 rounded-md cursor-pointer hover:bg-default-100"
            >
              Join
            </a>
          </li>
          <li>
            <Switch
              defaultSelected={theme === "dark"}
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
    </header>
  );
}
