import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { themes } from "../themes";

export const useTheme = () => {
  const [theme, setTheme] = useState(themes[0]);
  const [storedTheme, setStoredTheme] = useLocalStorage("theme");

  const setMode = mode => {
    setStoredTheme(mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    setMode(themes[themes.findIndex(t => t === theme) + 1] || themes[0]);
  };

  useEffect(() => {
    setMode(storedTheme || themes[0]);
  });

  return [theme, toggleTheme];
};
