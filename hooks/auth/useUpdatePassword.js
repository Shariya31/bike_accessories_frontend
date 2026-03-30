import { useMutation } from "@tanstack/react-query";
import { updatePasswordApi } from "@/api/auth.api";

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: updatePasswordApi,
  });