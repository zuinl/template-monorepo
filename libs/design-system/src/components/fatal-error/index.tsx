import Typography from "@mui/material/Typography";
import { FlexItem } from "../flex-item/index.tsx";
import Paper from "@mui/material/Paper";

export const FatalError = () => {
  return (
    <Paper>
      <FlexItem sx={{ flexDirection: "column" }}>
        <Typography variant="h3" color="error">
          Houve um problema ao carregar
        </Typography>
        <Typography variant="body1">Tente novamente mais tarde</Typography>
      </FlexItem>
    </Paper>
  );
};
