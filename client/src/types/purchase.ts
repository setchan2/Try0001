export interface PurchaseInfo {
  // Selected pixel area
  x: number // Grid X coordinate (0-99)
  y: number // Grid Y coordinate (0-99)
  width: number // Width in blocks
  height: number // Height in blocks

  // Pricing
  totalBlocks: number // Total number of 10x10 blocks
  pricePerBlock: number // Price per block (₩100)
  totalPrice: number // Total price

  // User content
  imageFile?: File // Uploaded image file
  imagePreview?: string // Base64 preview
  linkUrl?: string // Destination URL when clicked
  title?: string // Optional ad title
  description?: string // Optional ad description

  // Purchase metadata
  orderId?: string // Generated order ID
  userId?: string // Firebase user ID
}

export interface PurchaseStep {
  current: 1 | 2 | 3
  completed: number[] // Array of completed step numbers
}

export const PRICE_PER_BLOCK = 100 // ₩100 per 10x10 pixel block
