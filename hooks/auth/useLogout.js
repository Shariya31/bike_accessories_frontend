import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "@/api/auth.api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: async() => {
      await queryClient.cancelQueries()
      queryClient.clear(); // 🔥 remove all cache
      window.location.href = "/auth/login";
    },
  });
};