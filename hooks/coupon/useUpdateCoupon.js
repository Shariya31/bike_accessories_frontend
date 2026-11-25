import { updateCouponApi } from "@/api/coupon.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { showToast } from "@/lib/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({_id, code, discountPercentage, minShoppingAmount, validity }) => {
            const response = await updateCouponApi({_id, code, discountPercentage, minShoppingAmount, validity ,})
            if (!response.success) {
                throw new Error(response.message)
            }

            return response
        },

        onSuccess: (data) => {
            showToast('success', data.message)
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.COUPON
            })
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || error.message || "Something went wrong";

            showToast('error', message);
        }
    })
}