import { useMutation } from "@tanstack/react-query";
import { PostHomeVisitRequestBody, PostHomeVisitResponseBody } from "./types/post-home-visit";

type UsePostHomeVisitParams = PostHomeVisitRequestBody & {
  onSuccess?: () => void;
  onError?: () => void;
};

export const usePostHomeVisit = ({ onSuccess, onError, ...reqParams }: UsePostHomeVisitParams) => {
  const fetcher = () =>
    fetch("http://localhost:3000/homeVisit", {
      method: "POST",
      body: JSON.stringify(reqParams),
    }).then((res) => res.json());

  const {
    data,
    error,
    isPending: isLoading,
    mutate,
  } = useMutation<PostHomeVisitResponseBody>({
    mutationFn: fetcher,
    onSuccess,
    onError,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
