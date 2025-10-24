import mongoose, { Schema, Document } from 'mongoose'

export interface IPixel extends Document {
  x: number
  y: number
  width: number
  height: number
  ownerId: mongoose.Types.ObjectId
  imageUrl?: string
  linkUrl?: string
  color?: string
  price: number
  purchasedAt: Date
  updatedAt: Date
}

const PixelSchema = new Schema<IPixel>(
  {
    x: {
      type: Number,
      required: true,
      min: 0,
      max: 99
    },
    y: {
      type: Number,
      required: true,
      min: 0,
      max: 99
    },
    width: {
      type: Number,
      required: true,
      min: 1,
      max: 100
    },
    height: {
      type: Number,
      required: true,
      min: 1,
      max: 100
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: {
      type: String,
      default: null
    },
    linkUrl: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: '#3b82f6'
    },
    price: {
      type: Number,
      required: true,
      min: 100
    },
    purchasedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

// Index for efficient queries
PixelSchema.index({ x: 1, y: 1 })
PixelSchema.index({ ownerId: 1 })

// Validation: Check if pixel area overlaps with existing pixels
PixelSchema.pre('save', async function (next) {
  const pixel = this

  // Check for overlapping pixels
  const overlapping = await mongoose.models.Pixel.findOne({
    $or: [
      {
        x: { $lt: pixel.x + pixel.width },
        $expr: { $gt: [{ $add: ['$x', '$width'] }, pixel.x] },
        y: { $lt: pixel.y + pixel.height },
        $expr: { $gt: [{ $add: ['$y', '$height'] }, pixel.y] }
      }
    ]
  })

  if (overlapping && overlapping._id.toString() !== pixel._id.toString()) {
    throw new Error('Pixel area overlaps with existing pixel')
  }

  next()
})

export default mongoose.model<IPixel>('Pixel', PixelSchema)
