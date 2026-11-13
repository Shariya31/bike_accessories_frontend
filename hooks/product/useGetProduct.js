import { getProductApi } from "@/api/product.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetProduct = ({ limit = 10, deleteType = "SD" }) => {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.PRODUCTS, limit, deleteType],
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await getProductApi({ page: pageParam, limit, deleteType });

            return data
        },

        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined;
        },

        initialPageParam: 0,
    });
};