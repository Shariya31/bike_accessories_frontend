import { useMutation } from "@tanstack/react-query";
import { refreshTokenApi } from "@/api/auth.api";

export const useRefreshToken = () =>
  useMutation({
    mutationFn: refreshTokenApi,
  });