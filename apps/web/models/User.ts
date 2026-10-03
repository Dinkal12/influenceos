import mongoose, { Document, Schema, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export type UserRole = 'coordinator' | 'creator' | 'admin'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: UserRole
  avatar?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false, minlength: 6 },
    role: {
      type: String,
      enum: ['coordinator', 'creator', 'admin'],
      default: 'creator',
    },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Hash password before save
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
