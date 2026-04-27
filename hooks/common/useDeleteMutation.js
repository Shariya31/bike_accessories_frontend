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

      // ✅ Extract base key safely
      const baseKey = [query_key[0]]

      // ✅ Invalidate ALL related queries (SD + PD)
      queryClient.invalidateQueries({ queryKey: baseKey })
    },

    onError: (error) => {
      showToast('error', error.message)
    }
  })
}

export default useDeleteMutation