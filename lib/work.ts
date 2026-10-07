export interface Tool {
  slug: string
  name: string
  kicker: string
  summary: string
  points: string[]
  stack: string[]
  url: string
  shot: string
  shotAlt: string
}

export const workIntro =
  'Internal tools I built in revenue operations roles at past companies. Each one runs here as a live demo with sample data, so you can click around the real thing.'

export const toolkit = {
  name: 'RevOps Toolkit',
  url: 'https://toolkit.rodrigo-viola.com',
  summary:
    'Three tools that run outbound from start to finish. Campaign Ops plans the campaign and finds the people, Enrichment Ops gets their contact details, the emails go out through Smartlead, and Email Ops keeps the sending domains and mailboxes healthy.',
  flow: ['Campaign Ops', 'Enrichment Ops', 'Smartlead', 'Email Ops'],
}

export const tools: Tool[] = [
  {
    slug: 'campaign-ops',
    name: 'Campaign Ops',
    kicker: 'Outbound campaigns',
    summary:
      'Where we planned, launched and tracked every outbound campaign. Claude does the heavy lifting (the plan, the prospect search, the copy, reading replies and drafting answers) and the team approves each step.',
    points: [
      'Shows what a campaign will cost before anything is spent',
      'Works the same from the web app or from Claude Code',
      'Decides scale or kill from each campaign’s own targets, and leaves the final call to a person',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Claude', 'MCP', 'Smartlead', 'HubSpot'],
    url: 'https://campaigns.rodrigo-viola.com/campaigns',
    shot: '/work/campaign-ops.jpg',
    shotAlt: 'Campaign Ops: the campaign list with stages, verdicts and Smartlead numbers',
  },
  {
    slug: 'enrichment-ops',
    name: 'Enrichment Ops',
    kicker: 'Contact enrichment',
    summary:
      'An API that finds personal emails, work emails and phone numbers. It checks our own data first, then tries paid providers one by one, cheapest first, and logs what every lookup cost.',
    points: [
      'Never pays twice for the same person',
      'Never returns a work address when you asked for a personal one',
      'Shows which providers are worth what they charge',
    ],
    stack: ['n8n', 'TypeScript', 'Supabase', 'Postgres', 'Next.js', 'Clay'],
    url: 'https://enrichment.rodrigo-viola.com',
    shot: '/work/enrichment-ops.jpg',
    shotAlt: 'Enrichment Ops: provider scoreboard with hit rates, credits and spend',
  },
  {
    slug: 'email-ops',
    name: 'Email Ops',
    kicker: 'Email infrastructure',
    summary:
      'Every sending domain and mailbox in one place, across the mailbox providers, Smartlead and DNS. It checks their health daily and tells you which domains are ready to send and why.',
    points: [
      'Catches what each vendor misses on its own, like paid mailboxes that never send',
      'Fixes DNS records in Cloudflare after you approve the change',
      'Built-in assistant that answers questions about the fleet',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Cloudflare API', 'Claude', 'MCP'],
    url: 'https://email.rodrigo-viola.com',
    shot: '/work/email-ops.jpg',
    shotAlt: 'Email Ops: fleet overview with reconciliation, warmup and auth health',
  },
]

export const oneOffs: Tool[] = [
  {
    slug: 'agent-chat',
    name: 'Agent Chat',
    kicker: 'AI agent monitoring',
    summary:
      'Every conversation our AI recruiting agent had with clients, across Slack, phone calls and email, in one chat view. The team rates its replies, and the ratings feed back into how the agent is evaluated.',
    points: [],
    stack: ['Next.js', 'Postgres', 'Slack API', 'LangSmith', 'Web Push'],
    url: 'https://chat.rodrigo-viola.com',
    shot: '/work/agent-chat.jpg',
    shotAlt: 'Agent Chat: a channel conversation between a client team and the agent',
  },
  {
    slug: 'cost-dashboard',
    name: 'Cost Dashboard',
    kicker: 'Vendor spend',
    summary:
      'What we spent across about twenty AI, data and automation vendors, each billed differently. It pulls usage every day and checks it against the monthly invoices.',
    points: [],
    stack: ['n8n', 'Supabase', 'Next.js', 'SVG charts'],
    url: 'https://costs.rodrigo-viola.com',
    shot: '/work/cost-dashboard.jpg',
    shotAlt: 'Cost Dashboard: month-to-date spend, trend and category mix',
  },
]
