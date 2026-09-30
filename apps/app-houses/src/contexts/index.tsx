import { createContext, ReactNode, useContext, useMemo } from "react";
import { useHouses } from "../hooks/use-houses";

type AppContextPayload = {
  useHouses: ReturnType<typeof useHouses>;
};

const AppContext = createContext({} as AppContextPayload);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const housesData = useHouses();

  const value: AppContextPayload = useMemo(
    () => ({
      useHouses: housesData,
    }),
    [housesData],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
