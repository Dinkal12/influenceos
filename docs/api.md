# API Documentation

Base URL: http://localhost:4000/api

## Authentication
All protected endpoints require a Bearer token.

## Endpoints

### Campaigns
- GET /campaigns - List all campaigns
- POST /campaigns - Create a campaign
- GET /campaigns/:id - Get a campaign
- PATCH /campaigns/:id - Update a campaign
- DELETE /campaigns/:id - Delete a campaign

### Creators
- GET /creators - List creators
- POST /creators - Add a creator

### Payouts
- GET /payouts - List payouts
- POST /payouts - Initiate a payout
