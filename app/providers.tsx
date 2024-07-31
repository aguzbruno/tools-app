"use client";
import { ThemeProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </PrimeReactProvider>
  );
}
