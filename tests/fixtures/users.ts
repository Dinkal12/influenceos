export const mockAdminUser = {
  id: 'cuid-admin-001',
  email: 'admin@example.com',
  name: 'Agency Admin',
  role: 'AGENCY_ADMIN' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const mockCreator = {
  id: 'cuid-creator-001',
  email: 'creator@example.com',
  name: 'Test Creator',
  role: 'CREATOR' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
