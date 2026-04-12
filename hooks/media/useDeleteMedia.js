import { deleteMediaApi } from "@/api/media.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { showToast } from "@/lib/showToast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteMedia = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ ids, deleteType, deleteEndpoint }) => {
            const response = await deleteMediaApi({ ids, deleteType, deleteEndpoint })

            if (!response.success) throw new Error(response.message)

            return response
        },
        onSuccess: (data) => {
            showToast('success', data.message)
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.MEDIA
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        }
    })
}

export default useDeleteMedia