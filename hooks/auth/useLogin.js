import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "@/api/auth.api";
import { QUERY_KEYS } from "@/api/queryKeys";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER,
      });
    },
  });
};