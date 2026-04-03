import { createMediaApi } from "@/api/media.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMediaApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MEDIA,
      });
    },
  });
};