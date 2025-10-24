import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  name?: string
  oauthProvider: 'google' | 'github'
  oauthId: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    oauthProvider: {
      type: String,
      enum: ['google', 'github'],
      required: true
    },
    oauthId: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// Compound index for OAuth provider and ID
UserSchema.index({ oauthProvider: 1, oauthId: 1 }, { unique: true })

export default mongoose.model<IUser>('User', UserSchema)
