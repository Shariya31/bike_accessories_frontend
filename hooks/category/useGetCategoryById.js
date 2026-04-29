import { getCategoryById } from "@/api/category.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoryById = (id) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.CATEGORY, id],
        queryFn: async () => {
            const data = await getCategoryById(id)
            return data
        }
    })
}