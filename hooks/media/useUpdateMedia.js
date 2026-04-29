import { updateMediaApi } from "@/api/media.api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { showToast } from "@/lib/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateMedia = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ _id, alt, title }) => {
            const response = await updateMediaApi({ _id, alt, title })

            if (!response.success) throw new Error(response.message)

            return response
        },
        onSuccess: (data) => {
            showToast('success', data.message),
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.MEDIA
                })
        },
        onError: (error) => {
            const message =
                error?.response?.data?.message || error.message || "Something went wrong";

            showToast('error', message);
        }
    })
}

export default useUpdateMedia