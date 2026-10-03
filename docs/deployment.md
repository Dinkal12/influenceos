# Deployment

## Prerequisites
- Node.js 18+
- pnpm 9+
- PostgreSQL 16+

## Local Development

`ash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm db:seed
pnpm dev
`

## Docker

`ash
docker-compose -f docker/docker-compose.yml up
`

## Production
Deploy pps/web to Vercel and pps/api to Railway or Render.
