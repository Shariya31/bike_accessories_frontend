import { deleteMediaApi } from "@/api/media.api"
import { QUERY_KEYS } from "@/api/queryKeys"
import { showToast } from "@/lib/showToast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteMutation = (query_key) => {
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
                queryKey: query_key
            })
        },
        onError: (error) => {
            showToast('error', error.message)
        }
    })
}

export default useDeleteMutation