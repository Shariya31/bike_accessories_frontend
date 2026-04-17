import { getMediaById } from "@/api/media.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetMediaById = (id)=>{
    return useQuery({
        queryKey: [...QUERY_KEYS.MEDIA, id],
        queryFn: async () => {
            const {data} = await getMediaById(id)
            return data
        }
    })
}