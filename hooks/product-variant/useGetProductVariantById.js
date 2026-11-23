import { getProductVariantById } from "@/api/product-variant.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetProductVariantById = (id) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.PRODUCT_VARIANTS, id],
        queryFn: async () => {
            const data = await getProductVariantById(id)
            return data
        }
    })
}