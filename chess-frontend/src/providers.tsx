import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavbarComp } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        themes={["dark", "light"]}
      >
        <BrowserRouter>
          <NavbarComp />
          <main className="px-6 gap-4 w-full mx-auto max-w-[1536px] mt-1">
            {children}
          </main>
        </BrowserRouter>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
