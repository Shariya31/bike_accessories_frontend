import { updateProductVariantApi } from "@/api/product-variant.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { showToast } from "@/lib/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ _id, product, sku, color, size, mrp, sellingPrice, discountPercentage, media}) => {
            const response = await updateProductVariantApi({ _id, product, sku, color, size, mrp, sellingPrice, discountPercentage, media,})
            if (!response.success) {
                throw new Error(response.message)
            }

            return response
        },

        onSuccess: (data) => {
            showToast('success', data.message)
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PRODUCT_VARIANTS
            })
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || error.message || "Something went wrong";

            showToast('error', message);
        }
    })
}