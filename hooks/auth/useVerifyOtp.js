import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyOtpApi } from "@/api/auth.api";
import { QUERY_KEYS } from "@/api/queryKeys";

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtpApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER,
      });
    },
  });
};