import { createCategoryApi } from "@/api/category.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategoryApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CATEGORY
            })
        }
    })
}