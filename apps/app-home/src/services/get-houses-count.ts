import useSwr from "swr";

export type useGetHousesCountRes = {
  count: number;
};

export const useGetHousesCount = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: useGetHousesCountRes) => void;
  onError?: () => void;
}) => {
  const fetcher = () => fetch("http://localhost:3000/housesCount").then((res) => res.json());

  const { data, error, isLoading } = useSwr<useGetHousesCountRes>("get-houses-count", fetcher, {
    onSuccess,
    onError,
  });

  return {
    data,
    error,
    isLoading,
  };
};
