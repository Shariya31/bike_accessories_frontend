import { useMutation } from "@tanstack/react-query";
import { sendResetOtpApi } from "@/api/auth.api";

export const useSendResetOtp = () =>
  useMutation({
    mutationFn: sendResetOtpApi,
  });