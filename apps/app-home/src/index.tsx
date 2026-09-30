import { FlexItem, Typography } from "@libs/design-system";
import { AppProvider } from "./contexts";
import { Counter } from "./components/counter";

export const Main = () => {
  return (
    <AppProvider>
      <FlexItem sx={{ flexDirection: "column" }}>
        <Typography variant="h4" color="primary">
          Página inicial do condomínio
        </Typography>
        <Counter />
      </FlexItem>
    </AppProvider>
  );
};
