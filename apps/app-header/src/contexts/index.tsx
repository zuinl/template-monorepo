import { createContext, ReactNode, useContext, useMemo } from "react";
import { useTheme } from "../hooks/use-theme";

type HeaderContextPayload = {
  useTheme: ReturnType<typeof useTheme>;
};

const HeaderContext = createContext({} as HeaderContextPayload);

const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const themeData = useTheme();

  const value: HeaderContextPayload = useMemo(
    () => ({
      useTheme: themeData,
    }),
    [themeData],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const useHeaderContext = () => useContext(HeaderContext);

export { HeaderProvider, useHeaderContext };
