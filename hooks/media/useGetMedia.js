import { getMediaApi } from "@/api/media.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetMedia = ({ limit = 10, deleteType = "SD" }) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.MEDIA, deleteType],
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await getMediaApi({ page: pageParam, limit, deleteType });

            return {
                media: data.mediaData,
                hasMore: data.hasMore,
                nextPage: pageParam + 1,
                message: data.message,
                success: data.success,
            };
        },

        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined;
        },

        initialPageParam: 0,
    });
};