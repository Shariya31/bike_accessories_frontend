import { createProductVariantApi } from "@/api/product-variant.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProductVariantApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PRODUCT_VARIANTS
            })
        }
    })
}