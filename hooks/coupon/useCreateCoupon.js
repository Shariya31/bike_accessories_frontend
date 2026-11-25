import { createCouponApi } from "@/api/coupon.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCouponApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.COUPON
            })
        }
    })
}