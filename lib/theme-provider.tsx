// lib/theme-provider.tsx
"use client";

import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useThemeMode } from "@/hooks/use-theme-mode";

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeMode();

  // Use useMemo to prevent unnecessary theme recreation
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark" && {
            primary: {
              main: "#90caf9", // Light blue for dark mode
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      }),
    [mode], // Only recreate theme when mode changes
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
