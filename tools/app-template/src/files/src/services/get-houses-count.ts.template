import { useQuery } from "@tanstack/react-query";
import { GetHousesCountRes } from "./types/get-houses-count";

export const useGetHousesCount = () => {
  const fetcher = () => fetch("http://localhost:3000/housesCount").then((res) => res.json());

  const { data, error, isLoading } = useQuery<GetHousesCountRes>({
    queryKey: ["get-houses-count"],
    queryFn: fetcher,
  });

  return {
    data,
    error,
    isLoading,
  };
};
