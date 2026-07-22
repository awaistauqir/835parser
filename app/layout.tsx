// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/app/components/ThemeToggle";
import { ThemeModeProvider } from "@/hooks/use-theme-mode";
import ThemeProviderWrapper from "@/lib/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDI 835 Parser",
  description: "Convert healthcare remittance files to readable formats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeModeProvider>
          <ThemeProviderWrapper>
            {children}
            {/* Global theme toggle (positioned fixed) */}
          </ThemeProviderWrapper>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
