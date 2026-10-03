// Shared TypeScript types used across frontend and backend

export type Role = 'AGENCY_ADMIN' | 'COORDINATOR' | 'CREATOR'

export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED'

export interface User {
  id: string
  email: string
  name?: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  name: string
  description?: string
  status: CampaignStatus
  startDate?: string
  endDate?: string
  budget?: number
  createdAt: string
  updatedAt: string
}

export interface Creator {
  id: string
  userId: string
  handle: string
  platforms: string[]
  followersCount?: number
}

export interface Deliverable {
  id: string
  campaignId: string
  creatorId: string
  title: string
  dueDate?: string
  status: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
}

export interface Contract {
  id: string
  campaignId: string
  creatorId: string
  signedAt?: string
  status: 'DRAFT' | 'SENT' | 'SIGNED' | 'VOIDED'
}

export interface Payout {
  id: string
  campaignId: string
  creatorId: string
  amount: number
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED'
}
