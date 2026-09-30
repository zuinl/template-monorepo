import { HouseCard } from "./components/house-card";
import { Grid } from "@libs/design-system";
import { useAppContext } from "./contexts";

export const Main = () => {
  const { useHouses } = useAppContext();

  return (
    <Grid container spacing={3}>
      {useHouses.data?.map((house) => {
        return (
          <HouseCard
            {...house}
            key={house.id}
            onSelectClick={useHouses.onSelectClick}
            selectedHouse={useHouses.selectedHouse}
          />
        );
      })}
    </Grid>
  );
};
