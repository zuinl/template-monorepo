import { Button, Card, CardActions, CardContent, Grid, Typography } from "@libs/design-system";
import { House } from "../types/house";
import { transformStatus } from "../utils/transform-status";

export const HouseCard = ({
  id,
  block,
  plot,
  totalResidents,
  status,
  selectedHouse,
  onSelectClick,
}: House & { onSelectClick: (id: number) => void; selectedHouse?: number }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
            {transformStatus(status)}
          </Typography>
          <Typography variant="h5">
            Lote {plot}, Quadra {block}
          </Typography>
          <Typography variant="body2">{totalResidents} moradores</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onSelectClick(id)}
            disabled={selectedHouse === id}
          >
            {selectedHouse === id ? "Selecionado" : "Selecionar"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
