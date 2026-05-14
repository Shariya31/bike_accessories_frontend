import { getCategoryApi } from "@/api/category.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetCategory = ({ limit = 10, deleteType = "SD" }) => {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.CATEGORY, limit, deleteType],
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await getCategoryApi({ page: pageParam, limit, deleteType });

            return data
        },

        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined;
        },

        initialPageParam: 0,
    });
};