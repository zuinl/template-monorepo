import { Typography } from "@libs/design-system";
import { useAppContext } from "../contexts";

export function Counter() {
  const { useCount } = useAppContext();

  return (
    <Typography variant="body1">
      Temos atualmente <strong>{useCount.houses}</strong> casas prontas
    </Typography>
  );
}
