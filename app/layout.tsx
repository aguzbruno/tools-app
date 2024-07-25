'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";
import { useDarkMode } from "./store/darkMode";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {darkMode} = useDarkMode();
  return (
    <html lang="en">
      <body className={`${darkMode ? 'bg-black' : 'bg-white'}`}>
        <Providers>
          <Header/>{children}
        </Providers>
      </body>
    </html>
  );
}
