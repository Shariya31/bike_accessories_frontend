import { getProductVariantApi } from "@/api/product-variant.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetProductVariant = ({ limit = 10, deleteType = "SD" }) => {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.PRODUCT_VARIANTS, limit, deleteType],
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await getProductVariantApi({ page: pageParam, limit, deleteType });

            return data
        },

        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined;
        },

        initialPageParam: 0,
    });
};