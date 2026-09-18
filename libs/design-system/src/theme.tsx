import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { subscribeToThemeChange, unsubscribeFromThemeChange } from "@libs/events-hub";
import { ThemeOption } from "@libs/shared-types/theme/index.ts";
import { LocalStorageKey } from "@libs/shared-types/local-storage/index.ts";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const getCurrentTheme = (): ThemeOption =>
  localStorage.getItem(LocalStorageKey.THEME ?? ThemeOption.LIGHT) as ThemeOption;

export function ThemeProvider({ ...props }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(getCurrentTheme());

  useEffect(() => {
    const onThemeChange = () => {
      const updatedTheme =
        getCurrentTheme() === ThemeOption.DARK ? ThemeOption.LIGHT : ThemeOption.DARK;
      localStorage.setItem(LocalStorageKey.THEME, updatedTheme);
      setCurrentTheme(updatedTheme);
    };

    subscribeToThemeChange(onThemeChange);

    return () => {
      unsubscribeFromThemeChange(onThemeChange);
    };
  }, []);

  return (
    <MUIThemeProvider theme={currentTheme === ThemeOption.DARK ? darkTheme : lightTheme}>
      <CssBaseline />
      {props.children}
    </MUIThemeProvider>
  );
}
