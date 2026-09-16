import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

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

export function ThemeProvider({ ...props }: { children: ReactNode }) {
  const { mode, setMode } = useColorScheme();

  //TODO: atualizar tema via evento

  return (
    <MUIThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {props.children}
    </MUIThemeProvider>
  );
}
