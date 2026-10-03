export interface JobRole {
  slug: string
  title: string
  team: string
  location: string
  type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

/**
 * Demo content — replace with real listings keeping the same shape.
 * /careers reads directly from this array.
 */
export const roles: JobRole[] = [
  {
    slug: 'senior-analytics-engineer',
    title: 'Senior Analytics Engineer',
    team: 'Data',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Own the metrics layer behind campaign analytics — from per-deliverable engagement tracking to payout efficiency rollups used by every dashboard.',
    responsibilities: [
      'Design and maintain the event and aggregation pipelines that power live campaign dashboards',
      'Define metric semantics with product and ensure they stay consistent across creator and coordinator views',
      'Cut dashboard query latency as campaign volume grows',
      'Build trustworthy data quality checks for deliverable and payout records',
    ],
    requirements: [
      'Strong SQL and experience modelling analytics in a production data warehouse',
      'Comfortable with streaming or near-real-time data pipelines',
      'Experience shipping dashboards that non-technical stakeholders rely on daily',
      'Clear written communication — this role documents decisions heavily',
    ],
  },
  {
    slug: 'full-stack-engineer-creator-platform',
    title: 'Full-Stack Engineer, Creator Platform',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Build the surfaces creators use every day — deliverable submissions, contract views, earnings — across a Next.js and MongoDB stack.',
    responsibilities: [
      'Ship features across the creator portal end to end, from schema to UI',
      'Keep the deliverable review loop fast and predictable under load',
      'Improve correctness of the contract → approval → payout flow',
      'Write tests for the paths where money changes hands',
    ],
    requirements: [
      'Production experience with React and Node.js',
      'Familiarity with MongoDB data modelling',
      'An eye for UI detail — the portals are design-led',
      'Careful handling of auth, sessions, and API boundaries',
    ],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Shape the design system behind the marketing site and both portals, and own flows where coordinators and creators make expensive decisions.',
    responsibilities: [
      'Own flows end to end: brief creation, deliverable review, payout visibility',
      'Extend the existing token-based theme system across new surfaces',
      'Prototype in the browser alongside engineers',
      'Keep accessibility in scope from the first mockup',
    ],
    requirements: [
      'A portfolio showing shipped product work, not only brand work',
      'Fluency with design systems and component thinking',
      'Comfort working directly in React/HTML prototypes',
    ],
  },
  {
    slug: 'growth-marketing-manager',
    title: 'Growth Marketing Manager',
    team: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Own acquisition for both sides of the marketplace — brands running campaigns and creators joining them — and instrument what actually works.',
    responsibilities: [
      'Plan and run experiments across content, lifecycle, and paid channels',
      'Turn campaign analytics into a repeatable content engine',
      'Report on funnel performance with numbers you trust',
      'Partner with design on landing pages and launch narratives',
    ],
    requirements: [
      'Hands-on experience growing a two-sided product',
      'Strong analytical instincts — you build the dashboard, not just read it',
      'Excellent writing; you will draft copy before you delegate it',
    ],
  },
  {
    slug: 'community-creator-relations',
    title: 'Community & Creator Relations Lead',
    team: 'Community',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Be the human interface for creators on the platform: onboarding, feedback loops, and the programmes that keep great creators active.',
    responsibilities: [
      'Run creator onboarding and monitor early activation',
      'Turn creator feedback into prioritized product input',
      'Launch programmes (spotlights, office hours, referrals)',
      'Partner with coordinator-facing teams on marketplace health',
    ],
    requirements: [
      'Direct experience managing communities or creator programmes',
      'Empathy plus organisation — you handle both people and processes',
      'Comfortable operating with public-facing voice',
    ],
  },
]

export function getRole(slug: string): JobRole | undefined {
  return roles.find((r) => r.slug === slug)
}
