export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  /** ISO date, e.g. 2026-09-18 */
  date: string
  readTime: string
  /** Body paragraphs, rendered in order on /blog/[slug] */
  content: string[]
}

/**
 * Demo content — replace with real posts (or fetch from a CMS)
 * keeping the same shape. Listing pages read directly from this array.
 */
export const posts: BlogPost[] = [
  {
    slug: 'campaign-analytics-five-metrics-that-matter',
    title: 'Campaign analytics: the five metrics that actually matter',
    excerpt:
      'Impressions look good in a slide deck, but they rarely tell you whether a campaign worked. Here are the numbers we surface on the InfluenceOS dashboard and why.',
    category: 'Analytics',
    author: 'Priya Raman',
    date: '2026-09-24',
    readTime: '6 min read',
    content: [
      'Every campaign kicks off with the same temptation: report the biggest number available. Impressions and follower counts are easy to pull and easy to inflate, but they say almost nothing about whether a campaign moved the needle for the brand.',
      'The InfluenceOS analytics panel is built around five metrics instead. Engagement rate per deliverable, cost per engaged view, completion rate on tracked deliverables, conversion-assisted reach, and payout efficiency — the ratio of budget actually paid out versus budget allocated.',
      'Engagement rate per deliverable is the workhorse. Because every deliverable in the platform carries its own tracking record — post, reel, story, or video — you can compare creators on the same axis rather than mixing formats together and drawing conclusions from a blended average.',
      'Cost per engaged view keeps vanity reach honest. Two creators with identical view counts can differ by an order of magnitude in what the brand actually paid for meaningful attention. Splitting the spend by engaged views surfaces that immediately.',
      'Completion rate is the coordinator’s early-warning system. When deliverables stall in review or approvals drag, completion rate drops before the campaign calendar does. On live dashboards it updates as deliverables move through their lifecycle, so you can intervene mid-campaign instead of writing a post-mortem.',
      'Finally, payout efficiency closes the loop with finance. Campaigns that finish under budget are only genuinely efficient if the money reached creators on time. Tracking allocated-versus-paid in the same view as performance is what turns the dashboard into an operating tool rather than a reporting one.',
    ],
  },
  {
    slug: 'real-time-dashboards-explained',
    title: 'What "real-time" means in a campaign dashboard',
    excerpt:
      'Live numbers are only useful if you know how live they are. A look at how the InfluenceOS dashboard refreshes and what stays deliberately batched.',
    category: 'Analytics',
    author: 'Marco Silva',
    date: '2026-09-10',
    readTime: '5 min read',
    content: [
      'The phrase "real-time" gets used loosely in analytics products. Sometimes it means websocket updates; sometimes it means a refresh every fifteen minutes with a spinning icon in between.',
      'In the InfluenceOS dashboard, deliverable and notification data are genuinely live: the moment a deliverable changes state — submitted, approved, rejected — the coordinator and creator views both reflect it. That is the data you act on during a campaign.',
      'Aggregate statistics take a different path. Follower totals, engagement rollups, and payout summaries are computed on a short batch interval rather than on every read, because recomputing them on each page load would cost far more than the few seconds of staleness is worth.',
      'Knowing which is which matters more than the distinction itself. Live panels carry a subtle pulse indicator; batched panels carry a "last updated" timestamp. The interface never shows a number without telling you how current it is.',
      'The practical takeaway for coordinators: trust the live panels for in-flight decisions, and use the batched rollups for planning the next campaign rather than the current hour.',
    ],
  },
  {
    slug: 'brief-to-payout-campaign-flow',
    title: 'From brief to payout: how a campaign flows through InfluenceOS',
    excerpt:
      'Contracts, deliverables, approvals, and payments are one continuous thread in the platform — not four disconnected tools stitched together.',
    category: 'Product',
    author: 'Dana Whitfield',
    date: '2026-08-28',
    readTime: '7 min read',
    content: [
      'Most campaign teams run the same workflow across a spreadsheet, a contract template, three chat threads, and an invoice queue. Every handoff between those tools is a place where context gets lost.',
      'In InfluenceOS a campaign starts as a contract between a coordinator and a creator. The contract defines the deliverables, the rates, and the completion criteria, and every later stage inherits that definition rather than re-typing it.',
      'Deliverables attach directly to the contract. Each one carries a status, a reviewer, and a history, so when a creator submits a reel the coordinator sees exactly which clause of the agreement it satisfies.',
      'Approval is the pivot. The moment a deliverable is approved, the payout record associated with it becomes eligible — no separate reconciliation step, no manual calculation of what is owed.',
      'Payouts close the thread. Because each payment traces back through an approval to a deliverable and a contract, finance questions answer themselves: the audit trail is the workflow.',
    ],
  },
  {
    slug: 'creator-match-scores-explained',
    title: 'Creator match scores, explained',
    excerpt:
      'How the platform ranks creators for a campaign brief, and where human judgement still belongs in the process.',
    category: 'Platform',
    author: 'Priya Raman',
    date: '2026-08-12',
    readTime: '4 min read',
    content: [
      'A match score is a suggestion, not a verdict. It exists to shrink a list of hundreds of creators to a shortlist of ten that a coordinator can actually review in an afternoon.',
      'The score blends niche overlap with the brief, audience-size fit, historical completion rate, and availability. Completion rate tends to matter more than people expect: a creator with a modest following who has never missed a deadline routinely outranks a larger account that does.',
      'Engagement quality is weighted over raw engagement rate, because a spike driven by comments from bots or giveaway accounts does not represent an audience that will act on the campaign.',
      'Where the score deliberately stops is brand fit. Tone, aesthetic, and past collaborations are judgements a coordinator should make themselves — the platform surfaces the data, not the decision.',
    ],
  },
  {
    slug: 'automating-payouts-for-coordinators',
    title: 'Automating payouts without losing the paper trail',
    excerpt:
      'Automation and auditability are usually framed as a trade-off. Payout records in InfluenceOS are the automation.',
    category: 'Engineering',
    author: 'Marco Silva',
    date: '2026-07-30',
    readTime: '5 min read',
    content: [
      'The finance question that kills most automation plans is simple: if we stop manually approving every payment, can we still prove where the money went?',
      'The trick is to make the record and the trigger the same object. In InfluenceOS a payout is created by the approval event itself, carrying references to the deliverable and contract that justified it. There is no separate bookkeeping step to fall behind.',
      'Coordinators keep a cap: automation handles payments under a configured threshold, anything above it still routes for explicit approval. Teams get the throughput without surrendering control of large transfers.',
      'Because every payout references its source documents, exporting an audit package is a query rather than a scavenger hunt — filter by campaign, date range, or creator, and the chain reconstructs itself.',
      'The result is a system where the automated path and the audited path are not two paths at all.',
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
