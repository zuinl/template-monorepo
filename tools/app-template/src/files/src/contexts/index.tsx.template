import { createContext, ReactNode, useContext, useMemo } from "react";
import { useCount } from "../hooks/use-count";

type AppContextPayload = {
  useCount: ReturnType<typeof useCount>;
};

const AppContext = createContext({} as AppContextPayload);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const countData = useCount();

  const value: AppContextPayload = useMemo(
    () => ({
      useCount: countData,
    }),
    [countData],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
