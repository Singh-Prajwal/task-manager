import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = React.memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
});

export default ThemeToggle;
