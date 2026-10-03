# Architecture

This project is a Turborepo monorepo with the following key applications:

- **apps/web**: Next.js 14 frontend with App Router
- **apps/api**: NestJS REST API backend (optional)
- **packages/database**: Prisma ORM and PostgreSQL schema
- **packages/types**: Shared TypeScript interfaces
- **packages/validation**: Shared Zod validation schemas
- **workers/**: Background job processors
