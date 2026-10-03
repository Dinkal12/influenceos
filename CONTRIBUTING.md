# Contributing

Please read this guide before submitting a pull request.

## Branch Naming

- eat/your-feature
- ix/your-bug
- chore/your-task

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/).

## Development

`ash
pnpm install
pnpm dev
`
"@

  ".env.example" = @"
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/influencer_db

# Auth (NextAuth)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Storage (S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_BUCKET_NAME=influencer-files

# Email
RESEND_API_KEY=re_...

# DocuSign
DOCUSIGN_INTEGRATION_KEY=
DOCUSIGN_SECRET_KEY=
DOCUSIGN_ACCOUNT_ID=
