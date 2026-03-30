import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "@/api/auth.api";

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: verifyEmailApi,
  });