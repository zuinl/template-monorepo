import { publishToHouseSelect } from "@libs/events-hub";
import { useGetHouses } from "../services/get-houses";
import { useState } from "react";

export const useHouses = () => {
  const [selectedHouse, setSelectedHouse] = useState<number>();
  const { isLoading, error, data } = useGetHouses();

  const onSelectClick = (id: number): void => {
    const selectedHouseItem = data?.find((h) => h.id === id);

    if (selectedHouseItem) {
      setSelectedHouse(id);
      publishToHouseSelect(`Lote ${selectedHouseItem.plot}, Quadra ${selectedHouseItem.block}`);
    }
  };

  return {
    isLoading,
    error,
    data,
    selectedHouse,
    onSelectClick,
  };
};
