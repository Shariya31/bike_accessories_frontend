import { registerApi } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () =>
  useMutation({
    mutationFn: registerApi,
  });