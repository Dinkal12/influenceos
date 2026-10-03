# Influencer Campaign Manager

A full-stack monorepo platform for managing influencer campaigns, creators, coordinators, contracts, deliverables, and payouts.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: NestJS (optional, in pps/api)
- **Database**: PostgreSQL + Prisma ORM
- **Monorepo**: Turborepo + pnpm workspaces
- **Payments**: Stripe
- **E-Signatures**: DocuSign
- **Storage**: S3-compatible
- **Email**: Resend / SendGrid

## Getting Started

`ash
pnpm install
pnpm dev
`

## Workspace Structure

| Folder | Purpose |
|---|---|
| pps/web | Next.js frontend |
| pps/api | NestJS backend (optional) |
| packages/database | Prisma schema & migrations |
| packages/ui | Shared UI components |
| packages/types | Shared TypeScript types |
| packages/validation | Shared Zod schemas |
| packages/integrations | Stripe, DocuSign, email, storage |
| workers/ | Background jobs |
| 	ests/ | E2E and integration tests |
