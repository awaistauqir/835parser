// hooks/use-theme-mode.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeModeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleTheme: () => {},
});

// Hook to use the theme context
export function useThemeMode() {
  return useContext(ThemeModeContext);
}

// Provider component
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      // Check system preference first
      const stored = localStorage.getItem("theme") as ThemeMode | null;
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (stored) {
        setMode(stored);
      } else if (systemPrefersDark) {
        setMode("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}
