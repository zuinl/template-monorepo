import { useState } from "react";
import { useGetHousesCount } from "../services/get-houses-count";

export const useCount = () => {
  const [houses, setHouses] = useState(0);
  useGetHousesCount({ onSuccess: (data) => setHouses(data.count) });
  console.log(houses);

  return {
    houses,
  };
};
