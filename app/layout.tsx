// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/lib/theme-provider";
import ThemeToggle from "@/app/components/ThemeToggle";
import { ThemeModeProvider } from "@/hooks/use-theme-mode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDI 835 to PDF Converter",
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
            <div
              style={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 1000,
              }}
            >
              <ThemeToggle />
            </div>
          </ThemeProviderWrapper>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
