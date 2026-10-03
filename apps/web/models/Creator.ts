import mongoose, { Document, Schema, Model, Types } from 'mongoose'

export interface ICreator extends Document {
  user: Types.ObjectId
  bio: string
  niche: string[]
  platforms: {
    name: string
    handle: string
    followers: number
    engagementRate: number
    profileUrl?: string
  }[]
  location?: string
  languages: string[]
  totalFollowers: number
  averageEngagement: number
  ratePerPost?: number
  portfolio: string[]
  completedCampaigns: number
  rating: number
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

const CreatorSchema = new Schema<ICreator>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String, default: '' },
    niche: [{ type: String }],
    platforms: [
      {
        name: { type: String, required: true },
        handle: { type: String, required: true },
        followers: { type: Number, default: 0 },
        engagementRate: { type: Number, default: 0 },
        profileUrl: { type: String },
      },
    ],
    location: { type: String },
    languages: [{ type: String, default: ['English'] }],
    totalFollowers: { type: Number, default: 0 },
    averageEngagement: { type: Number, default: 0 },
    ratePerPost: { type: Number },
    portfolio: [{ type: String }],
    completedCampaigns: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
)

CreatorSchema.index({ niche: 1, totalFollowers: -1 })
CreatorSchema.index({ isAvailable: 1, rating: -1 })

const Creator: Model<ICreator> =
  mongoose.models.Creator || mongoose.model<ICreator>('Creator', CreatorSchema)

export default Creator
