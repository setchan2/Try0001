export interface PixelBlock {
  x: number // Grid X (0-99)
  y: number // Grid Y (0-99)
  width: number // Width in blocks
  height: number // Height in blocks
  ownerId?: string
  imageUrl?: string
  linkUrl?: string
  color?: string
}

export interface Selection {
  startX: number
  startY: number
  endX: number
  endY: number
}

export interface CanvasState {
  scale: number
  offsetX: number
  offsetY: number
  isDragging: boolean
  isSelecting: boolean
  selection: Selection | null
}

export const CANVAS_SIZE = 1000 // 1000x1000 픽셀
export const GRID_SIZE = 100 // 100x100 블록
export const BLOCK_SIZE = 10 // 각 블록은 10x10 픽셀
