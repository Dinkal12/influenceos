import mongoose from 'mongoose'

// Global cache to avoid reconnecting on every hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB(): Promise<mongoose.Connection> {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable in .env.local'
    )
  }

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      // Fail fast (5s instead of the 30s default) so requests return a clear
      // error instead of hitting the serverless function timeout.
      .connect(MONGODB_URI, { bufferCommands: false, serverSelectionTimeoutMS: 5000, connectTimeoutMS: 5000 })
      .then((m) => m.connection)
  }

  cached.conn = await cached.promise
  return cached.conn
}
