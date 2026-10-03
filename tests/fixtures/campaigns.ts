export const mockCampaign = {
  id: 'cuid-campaign-001',
  name: 'Summer Launch 2025',
  description: 'A summer product launch campaign',
  status: 'ACTIVE' as const,
  budget: 50000,
  startDate: '2025-06-01T00:00:00Z',
  endDate: '2025-08-31T00:00:00Z',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
