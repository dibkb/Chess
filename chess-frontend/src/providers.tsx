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
        <main className="container mx-auto mt-1">{children}</main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
