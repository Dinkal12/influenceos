import mongoose, { Document, Schema, Model, Types } from 'mongoose'

export type ContractStatus = 'pending' | 'accepted' | 'rejected' | 'active' | 'completed' | 'disputed'

export interface IContract extends Document {
  campaign: Types.ObjectId
  creator: Types.ObjectId
  coordinator: Types.ObjectId
  status: ContractStatus
  agreedRate: number
  deliverableCount: number
  terms: string
  startDate: Date
  dueDate: Date
  acceptedAt?: Date
  completedAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const ContractSchema = new Schema<IContract>(
  {
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coordinator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'active', 'completed', 'disputed'],
      default: 'pending',
    },
    agreedRate: { type: Number, required: true, min: 0 },
    deliverableCount: { type: Number, required: true, min: 1 },
    terms: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    acceptedAt: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
)

ContractSchema.index({ campaign: 1, creator: 1 }, { unique: true })
ContractSchema.index({ creator: 1, status: 1 })
ContractSchema.index({ coordinator: 1, status: 1 })

const Contract: Model<IContract> =
  mongoose.models.Contract || mongoose.model<IContract>('Contract', ContractSchema)

export default Contract
