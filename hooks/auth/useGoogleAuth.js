import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleAuthApi } from "@/api/auth.api";
import { QUERY_KEYS } from "@/api/queryKeys";

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleAuthApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER,
      });
    },
  });
};