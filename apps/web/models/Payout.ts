import mongoose, { Document, Schema, Model, Types } from 'mongoose'

export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
export type PayoutMethod = 'bank_transfer' | 'paypal' | 'stripe' | 'upi' | 'crypto'

export interface IPayout extends Document {
  contract: Types.ObjectId
  deliverable: Types.ObjectId
  creator: Types.ObjectId
  coordinator: Types.ObjectId
  campaign: Types.ObjectId
  amount: number
  currency: string
  status: PayoutStatus
  method: PayoutMethod
  transactionId?: string
  paidAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const PayoutSchema = new Schema<IPayout>(
  {
    contract: { type: Schema.Types.ObjectId, ref: 'Contract', required: true },
    deliverable: { type: Schema.Types.ObjectId, ref: 'Deliverable', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coordinator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    method: {
      type: String,
      enum: ['bank_transfer', 'paypal', 'stripe', 'upi', 'crypto'],
      required: true,
    },
    transactionId: { type: String },
    paidAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
)

PayoutSchema.index({ creator: 1, status: 1 })
PayoutSchema.index({ campaign: 1, createdAt: -1 })

const Payout: Model<IPayout> =
  mongoose.models.Payout || mongoose.model<IPayout>('Payout', PayoutSchema)

export default Payout
