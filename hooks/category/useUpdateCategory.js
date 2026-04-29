import { updateCategoryApi } from "@/api/category.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { showToast } from "@/lib/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ _id, name, slug }) => {
            const response = await updateCategoryApi({ _id, name, slug })
            console.log(response, 'res101')
            if (!response.success) {
                throw new Error(response.message)
            }

            return response
        },

        onSuccess: (data) => {
            showToast('success', data.message)
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CATEGORY
            })
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || error.message || "Something went wrong";

            showToast('error', message);
        }
    })
}