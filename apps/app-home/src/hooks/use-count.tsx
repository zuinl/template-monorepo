import { useEffect, useState } from "react";
import { useGetHousesCount } from "../services/get-houses-count";

export const useCount = () => {
  const [houses, setHouses] = useState(0);
  const housesCountData = useGetHousesCount();

  useEffect(() => {
    if (housesCountData.data && housesCountData.data.count !== houses) {
      setHouses(housesCountData.data.count);
    }
  }, [housesCountData.data]);

  return {
    houses,
  };
};
