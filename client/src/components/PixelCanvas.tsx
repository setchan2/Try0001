import { useRef, useEffect, useState, useCallback } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import type { PixelBlock, Selection } from '@/types/canvas'
import { CANVAS_SIZE, GRID_SIZE, BLOCK_SIZE } from '@/types/canvas'

interface PixelCanvasProps {
  pixels?: PixelBlock[]
  onSelectionChange?: (selection: Selection | null) => void
}

export default function PixelCanvas({ pixels = [], onSelectionChange }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [hoveredBlock, setHoveredBlock] = useState<{ x: number; y: number } | null>(null)

  // 픽셀 그리드를 캔버스에 그리기
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw grid lines (every 10 pixels)
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5

    for (let i = 0; i <= GRID_SIZE; i++) {
      const pos = i * BLOCK_SIZE
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(pos, 0)
      ctx.lineTo(pos, CANVAS_SIZE)
      ctx.stroke()

      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(0, pos)
      ctx.lineTo(CANVAS_SIZE, pos)
      ctx.stroke()
    }

    // Draw sold pixels
    pixels.forEach((pixel) => {
      const x = pixel.x * BLOCK_SIZE
      const y = pixel.y * BLOCK_SIZE
      const width = pixel.width * BLOCK_SIZE
      const height = pixel.height * BLOCK_SIZE

      if (pixel.imageUrl) {
        // TODO: Draw image when implemented
        ctx.fillStyle = pixel.color || '#3b82f6'
        ctx.fillRect(x, y, width, height)
      } else {
        ctx.fillStyle = pixel.color || '#3b82f6'
        ctx.fillRect(x, y, width, height)
      }
    })

    // Draw hovered block
    if (hoveredBlock) {
      const x = hoveredBlock.x * BLOCK_SIZE
      const y = hoveredBlock.y * BLOCK_SIZE

      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE)

      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE)
    }

    // Draw selection
    if (selection) {
      const startX = Math.min(selection.startX, selection.endX) * BLOCK_SIZE
      const startY = Math.min(selection.startY, selection.endY) * BLOCK_SIZE
      const width = (Math.abs(selection.endX - selection.startX) + 1) * BLOCK_SIZE
      const height = (Math.abs(selection.endY - selection.startY) + 1) * BLOCK_SIZE

      // Fill
      ctx.fillStyle = 'rgba(251, 191, 36, 0.3)'
      ctx.fillRect(startX, startY, width, height)

      // Border
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.strokeRect(startX, startY, width, height)
    }
  }, [pixels, hoveredBlock, selection])

  // Redraw on changes
  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Convert mouse position to grid coordinates
  const getGridPosition = (
    clientX: number,
    clientY: number,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = CANVAS_SIZE / rect.width
    const scaleY = CANVAS_SIZE / rect.height

    const canvasX = (clientX - rect.left) * scaleX
    const canvasY = (clientY - rect.top) * scaleY

    const gridX = Math.floor(canvasX / BLOCK_SIZE)
    const gridY = Math.floor(canvasY / BLOCK_SIZE)

    return {
      x: Math.max(0, Math.min(GRID_SIZE - 1, gridX)),
      y: Math.max(0, Math.min(GRID_SIZE - 1, gridY))
    }
  }

  // Check if pixel is already sold
  const isPixelSold = (x: number, y: number): boolean => {
    return pixels.some(
      (pixel) =>
        x >= pixel.x &&
        x < pixel.x + pixel.width &&
        y >= pixel.y &&
        y < pixel.y + pixel.height
    )
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pos = getGridPosition(e.clientX, e.clientY, canvas)

    if (isPixelSold(pos.x, pos.y)) {
      // TODO: Show pixel details modal
      console.log('Pixel already sold:', pos)
      return
    }

    setIsSelecting(true)
    setSelection({
      startX: pos.x,
      startY: pos.y,
      endX: pos.x,
      endY: pos.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pos = getGridPosition(e.clientX, e.clientY, canvas)

    if (isSelecting && selection) {
      setSelection({
        ...selection,
        endX: pos.x,
        endY: pos.y
      })
    } else {
      setHoveredBlock(pos)
    }
  }

  const handleMouseUp = () => {
    if (isSelecting && selection) {
      onSelectionChange?.(selection)
    }
    setIsSelecting(false)
  }

  const handleMouseLeave = () => {
    setHoveredBlock(null)
    if (isSelecting) {
      setIsSelecting(false)
      setSelection(null)
    }
  }

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        <TransformComponent
          wrapperClass="w-full h-full flex items-center justify-center"
          contentClass="cursor-crosshair"
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border border-gray-300 shadow-lg bg-white"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              imageRendering: 'pixelated',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Selection Info */}
      {selection && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">선택한 영역</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              크기: {Math.abs(selection.endX - selection.startX) + 1} x{' '}
              {Math.abs(selection.endY - selection.startY) + 1} 블록
            </p>
            <p>
              픽셀: {(Math.abs(selection.endX - selection.startX) + 1) * BLOCK_SIZE} x{' '}
              {(Math.abs(selection.endY - selection.startY) + 1) * BLOCK_SIZE}
            </p>
            <p className="font-semibold text-primary-600 pt-1 border-t">
              가격: ₩
              {(
                (Math.abs(selection.endX - selection.startX) + 1) *
                (Math.abs(selection.endY - selection.startY) + 1) *
                100
              ).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
