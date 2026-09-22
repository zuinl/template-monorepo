import { createContext, ReactNode, useContext, useMemo } from "react";
import { useDrawer } from "../hooks/use-drawer";

type HeaderContextPayload = {
  useDrawer: ReturnType<typeof useDrawer>;
};

const HeaderContext = createContext({} as HeaderContextPayload);

const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const drawerData = useDrawer();

  const value: HeaderContextPayload = useMemo(
    () => ({
      useDrawer: drawerData,
    }),
    [drawerData],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const useHeaderContext = () => useContext(HeaderContext);

export { HeaderProvider, useHeaderContext };
