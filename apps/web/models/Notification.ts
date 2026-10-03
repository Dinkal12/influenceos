import mongoose, { Document, Schema, Model, Types } from 'mongoose'

export type NotificationType =
  | 'campaign_invite'
  | 'contract_accepted'
  | 'contract_rejected'
  | 'deliverable_approved'
  | 'deliverable_rejected'
  | 'deliverable_revision'
  | 'payout_sent'
  | 'payout_completed'
  | 'general'

export interface INotification extends Document {
  user: Types.ObjectId
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  link?: string
  meta?: Record<string, unknown>
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: [
        'campaign_invite', 'contract_accepted', 'contract_rejected',
        'deliverable_approved', 'deliverable_rejected', 'deliverable_revision',
        'payout_sent', 'payout_completed', 'general',
      ],
      default: 'general',
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
)

NotificationSchema.index({ user: 1, isRead: 1, createdAt: -1 })

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema)

export default Notification
