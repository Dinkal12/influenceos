import { z } from 'zod'

export const CreateCampaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required').max(120),
  description: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  budget: z.number().positive().optional(),
})

export const CreateCreatorSchema = z.object({
  handle: z.string().min(1),
  platforms: z.array(z.string()).min(1),
  followersCount: z.number().int().nonneg().optional(),
})

export const CreatePayoutSchema = z.object({
  campaignId: z.string().cuid(),
  creatorId: z.string().cuid(),
  amount: z.number().positive(),
  currency: z.string().length(3).default('USD'),
})

export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>
export type CreateCreatorInput = z.infer<typeof CreateCreatorSchema>
export type CreatePayoutInput = z.infer<typeof CreatePayoutSchema>
