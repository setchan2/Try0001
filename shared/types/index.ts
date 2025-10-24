// User types
export interface User {
  id: string
  email: string
  name?: string
  oauthProvider: 'google' | 'github'
  oauthId: string
  createdAt: Date
  updatedAt: Date
}

// Pixel types
export interface Pixel {
  id: string
  x: number // X coordinate (0-99)
  y: number // Y coordinate (0-99)
  width: number // Width in 10px blocks
  height: number // Height in 10px blocks
  ownerId: string
  imageUrl?: string
  linkUrl?: string
  price: number
  purchasedAt: Date
}

// Transaction types
export interface Transaction {
  id: string
  userId: string
  pixels: Array<{ x: number; y: number }>
  amount: number
  paymentKey?: string
  orderId: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Canvas Grid type
export type PixelGrid = Array<Array<Pixel | null>> // 100x100 grid
