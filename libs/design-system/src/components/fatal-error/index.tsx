import Typography from "@mui/material/Typography";
import { FlexItem } from "../flex-item/index.tsx";
import Paper from "@mui/material/Paper";

export const FatalError = () => {
  return (
    <Paper variant="outlined">
      <FlexItem sx={{ flexDirection: "column", p: 3 }}>
        <Typography variant="h4" color="error">
          Houve um problema ao carregar
        </Typography>
        <Typography variant="body1">Tente novamente mais tarde</Typography>
      </FlexItem>
    </Paper>
  );
};
