import mongoose, { Document, Schema, Model, Types } from 'mongoose'

export type DeliverableType = 'post' | 'reel' | 'story' | 'video' | 'blog' | 'tweet'
export type DeliverableStatus = 'pending' | 'in_progress' | 'submitted' | 'approved' | 'rejected' | 'revision_requested'

export interface IDeliverable extends Document {
  contract: Types.ObjectId
  campaign: Types.ObjectId
  creator: Types.ObjectId
  type: DeliverableType
  status: DeliverableStatus
  title: string
  description?: string
  platform: string
  dueDate: Date
  submittedAt?: Date
  approvedAt?: Date
  contentUrl?: string
  previewUrl?: string
  feedback?: string
  revisionCount: number
  createdAt: Date
  updatedAt: Date
}

const DeliverableSchema = new Schema<IDeliverable>(
  {
    contract: { type: Schema.Types.ObjectId, ref: 'Contract', required: true },
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['post', 'reel', 'story', 'video', 'blog', 'tweet'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'submitted', 'approved', 'rejected', 'revision_requested'],
      default: 'pending',
    },
    title: { type: String, required: true },
    description: { type: String },
    platform: { type: String, required: true },
    dueDate: { type: Date, required: true },
    submittedAt: { type: Date },
    approvedAt: { type: Date },
    contentUrl: { type: String },
    previewUrl: { type: String },
    feedback: { type: String },
    revisionCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

DeliverableSchema.index({ contract: 1, status: 1 })
DeliverableSchema.index({ creator: 1, dueDate: 1 })

const Deliverable: Model<IDeliverable> =
  mongoose.models.Deliverable ||
  mongoose.model<IDeliverable>('Deliverable', DeliverableSchema)

export default Deliverable
