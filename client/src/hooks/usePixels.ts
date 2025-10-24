import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'
import type { PixelBlock } from '@/types/canvas'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface PixelStats {
  soldBlocks: number
  totalBlocks: number
  availableBlocks: number
  completionPercentage: string
  totalRevenue: number
}

// Fetch all pixels
export const usePixels = () => {
  return useQuery({
    queryKey: ['pixels'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PixelBlock[]>>('/pixels')
      return response.data.data || []
    },
    refetchOnMount: true,
    staleTime: 30000 // 30 seconds
  })
}

// Fetch pixel statistics
export const usePixelStats = () => {
  return useQuery({
    queryKey: ['pixel-stats'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PixelStats>>('/pixels/stats')
      return response.data.data
    },
    refetchInterval: 60000 // Refetch every minute
  })
}

// Check if area is available
export const useCheckAvailability = () => {
  return useMutation({
    mutationFn: async (area: { x: number; y: number; width: number; height: number }) => {
      const response = await api.post<ApiResponse<{ available: boolean }>>(
        '/pixels/check-availability',
        area
      )
      return response.data.data
    }
  })
}

// Update pixel
export const useUpdatePixel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string
      data: { imageUrl?: string; linkUrl?: string; color?: string }
    }) => {
      const response = await api.put<ApiResponse<PixelBlock>>(`/pixels/${id}`, data)
      return response.data.data
    },
    onSuccess: () => {
      // Invalidate and refetch pixels
      queryClient.invalidateQueries({ queryKey: ['pixels'] })
      queryClient.invalidateQueries({ queryKey: ['pixel-stats'] })
    }
  })
}

// Get pixel by coordinates
export const usePixelByCoordinates = (x: number, y: number, enabled = true) => {
  return useQuery({
    queryKey: ['pixel', x, y],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PixelBlock>>(`/pixels/${x}/${y}`)
      return response.data.data
    },
    enabled
  })
}
