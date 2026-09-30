import { useQuery } from "@tanstack/react-query";
import { House } from "../types/house";

export type useGetHousesCountRes = House[];

export const useGetHouses = () => {
  const fetcher = () => fetch("http://localhost:3000/houses").then((res) => res.json());

  const { data, error, isLoading } = useQuery<useGetHousesCountRes>({
    queryKey: ["get-houses"],
    queryFn: fetcher,
  });

  return {
    data,
    error,
    isLoading,
  };
};
