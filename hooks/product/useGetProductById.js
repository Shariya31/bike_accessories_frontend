import { getProductById } from "@/api/product.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetProductById = (id) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.PRODUCTS, id],
        queryFn: async () => {
            const data = await getProductById(id)
            return data
        }
    })
}