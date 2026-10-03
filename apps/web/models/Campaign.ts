import mongoose, { Document, Schema, Model, Types } from 'mongoose'

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
export type CampaignPlatform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'all'

export interface ICampaign extends Document {
  title: string
  description: string
  brand: string
  coordinator: Types.ObjectId
  budget: number
  spent: number
  platforms: CampaignPlatform[]
  status: CampaignStatus
  startDate: Date
  endDate: Date
  targetAudience?: string
  hashtags: string[]
  coverImage?: string
  requirements?: string
  maxCreators: number
  enrolledCreators: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const CampaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    brand: { type: String, required: true, trim: true },
    coordinator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    budget: { type: Number, required: true, min: 0 },
    spent: { type: Number, default: 0 },
    platforms: [{ type: String, enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'all'] }],
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'completed', 'cancelled'],
      default: 'draft',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    targetAudience: { type: String },
    hashtags: [{ type: String }],
    coverImage: { type: String },
    requirements: { type: String },
    maxCreators: { type: Number, default: 10 },
    enrolledCreators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

CampaignSchema.index({ coordinator: 1, status: 1 })
CampaignSchema.index({ status: 1, startDate: -1 })

const Campaign: Model<ICampaign> =
  mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema)

export default Campaign
