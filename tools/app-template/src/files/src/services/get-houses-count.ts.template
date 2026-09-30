import { useQuery } from "@tanstack/react-query";

export type useGetHousesCountRes = {
  count: number;
};

export const useGetHousesCount = () => {
  const fetcher = () => fetch("http://localhost:3000/housesCount").then((res) => res.json());

  const { data, error, isLoading } = useQuery<useGetHousesCountRes>({
    queryKey: ["get-houses-count"],
    queryFn: fetcher,
  });

  return {
    data,
    error,
    isLoading,
  };
};
