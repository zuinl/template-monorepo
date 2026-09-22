import { Header } from "./components/header";
import { HeaderProvider } from "./contexts";

export const HeaderMain = () => {
  return (
    <HeaderProvider>
      <Header></Header>
    </HeaderProvider>
  );
};
