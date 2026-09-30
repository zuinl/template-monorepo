import { FlexItem, Typography } from "@libs/design-system";
import { AppProvider } from "./contexts";

export const Main = () => {
  return (
    <AppProvider>
      <FlexItem sx={{ flexDirection: "column" }}>
        <Typography variant="h4" color="primary">
          Página inicial do condomínio
        </Typography>
        <Typography variant="body1">
          Temos atualmente <strong>X</strong> casas prontas
        </Typography>
      </FlexItem>
    </AppProvider>
  );
};
