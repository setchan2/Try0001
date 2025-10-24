import { create } from 'zustand'
import type { PixelBlock, Selection } from '@/types/canvas'

interface PixelStore {
  // Pixel data
  pixels: PixelBlock[]
  setPixels: (pixels: PixelBlock[]) => void
  addPixel: (pixel: PixelBlock) => void
  updatePixel: (id: string, updates: Partial<PixelBlock>) => void

  // Selection state
  currentSelection: Selection | null
  setCurrentSelection: (selection: Selection | null) => void

  // UI state
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  error: string | null
  setError: (error: string | null) => void

  // Stats
  getSoldPixelsCount: () => number
  getSelectedPixelsCount: () => number
  getSelectionPrice: () => number
}

export const usePixelStore = create<PixelStore>((set, get) => ({
  // Initial state
  pixels: [],
  currentSelection: null,
  isLoading: false,
  error: null,

  // Pixel actions
  setPixels: (pixels) => set({ pixels }),

  addPixel: (pixel) =>
    set((state) => ({
      pixels: [...state.pixels, pixel]
    })),

  updatePixel: (id, updates) =>
    set((state) => ({
      pixels: state.pixels.map((p) => {
        // Assuming we add an id field to PixelBlock
        return (p as any).id === id ? { ...p, ...updates } : p
      })
    })),

  // Selection actions
  setCurrentSelection: (selection) => set({ currentSelection: selection }),

  // UI actions
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Computed values
  getSoldPixelsCount: () => {
    const { pixels } = get()
    return pixels.reduce((total, pixel) => {
      return total + pixel.width * pixel.height
    }, 0)
  },

  getSelectedPixelsCount: () => {
    const { currentSelection } = get()
    if (!currentSelection) return 0

    const width = Math.abs(currentSelection.endX - currentSelection.startX) + 1
    const height = Math.abs(currentSelection.endY - currentSelection.startY) + 1
    return width * height
  },

  getSelectionPrice: () => {
    const count = get().getSelectedPixelsCount()
    return count * 100 // 블록당 100원
  }
}))
