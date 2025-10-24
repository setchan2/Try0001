import mongoose, { Schema, Document } from 'mongoose'

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId
  pixels: Array<{ x: number; y: number }>
  amount: number
  paymentKey?: string
  orderId: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  tossPaymentData?: any
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pixels: [
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
        }
      }
    ],
    amount: {
      type: Number,
      required: true,
      min: 100
    },
    paymentKey: {
      type: String
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending'
    },
    tossPaymentData: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
)

// Indexes
TransactionSchema.index({ userId: 1, createdAt: -1 })
TransactionSchema.index({ orderId: 1 }, { unique: true })
TransactionSchema.index({ status: 1 })

export default mongoose.model<ITransaction>('Transaction', TransactionSchema)
