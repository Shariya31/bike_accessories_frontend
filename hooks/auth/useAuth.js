import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "@/api/auth.api";
import { QUERY_KEYS } from "@/api/queryKeys";

export const useAuth = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: async () => {
      const { data } = await getMeApi();
      return data.data;
    },
    retry: false,
  });
};