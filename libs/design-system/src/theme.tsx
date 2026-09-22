import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useEffect, useState } from "react";
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

export const getCurrentTheme = (): ThemeOption => {
  const localStorageTheme = localStorage.getItem(LocalStorageKey.THEME);
  if (localStorageTheme) return localStorageTheme as ThemeOption;
  else return ThemeOption.LIGHT;
};

export function ThemeProvider({ ...props }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(getCurrentTheme());

  useEffect(() => {
    const onThemeChange = () => {
      const updatedTheme =
        getCurrentTheme() === ThemeOption.DARK ? ThemeOption.LIGHT : ThemeOption.DARK;
      localStorage.setItem(LocalStorageKey.THEME, updatedTheme);
      console.log("Evento recebido: ", updatedTheme);
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
