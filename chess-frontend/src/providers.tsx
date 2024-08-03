import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Navbar } from "./components/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        themes={["dark", "light"]}
      >
        <Navbar />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
