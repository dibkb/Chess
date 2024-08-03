import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="light"
        attribute="class"
        themes={["dark", "light"]}
      >
        <ThemeSwitcher>{children}</ThemeSwitcher>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
