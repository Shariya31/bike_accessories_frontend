import { useMutation } from "@tanstack/react-query";
import { verifyResetOtpApi } from "@/api/auth.api";

export const useVerifyResetOtp = () =>
  useMutation({
    mutationFn: verifyResetOtpApi,
  });