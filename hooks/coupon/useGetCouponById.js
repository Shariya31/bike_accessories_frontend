import { getCouponById } from "@/api/coupon.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetCouponById = (id) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.COUPON, id],
        queryFn: async () => {
            const data = await getCouponById(id)
            return data
        }
    })
}