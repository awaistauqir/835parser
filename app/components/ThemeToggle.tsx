// app/components/ThemeToggle.tsx
"use client";

import { useTheme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "@/hooks/use-theme-mode";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  return (
    <Tooltip
      title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      placement="left"
    >
      <IconButton
        onClick={toggleTheme}
        size="small"
        sx={{
          color: theme.palette.text.primary,
          bgcolor: "background.paper",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
