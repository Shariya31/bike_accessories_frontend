import { createProductApi } from "@/api/product.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProductApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PRODUCTS
            })
        }
    })
}