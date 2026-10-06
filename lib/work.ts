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
  'Internal tools I designed and built in revenue operations roles at past companies. Each one is rebuilt here as a live demo: the real interface, running on sample data. Click into any of them.'

export const toolkit = {
  name: 'RevOps Toolkit',
  url: 'https://revops-toolkit-demo.netlify.app',
  summary:
    'Three tools that run outbound end to end. Campaign Ops plans a campaign and finds the people, Enrichment Ops gets their contact details through a provider waterfall, the campaign sends through Smartlead, and Email Ops keeps every sending domain and mailbox healthy.',
  flow: ['Campaign Ops', 'Enrichment Ops', 'Smartlead', 'Email Ops'],
}

export const tools: Tool[] = [
  {
    slug: 'campaign-ops',
    name: 'Campaign Ops',
    kicker: 'Agentic campaign desk',
    summary:
      'Where outbound campaigns are planned, launched and judged. Claude does the work through versioned skills, from the plan to the search, copy, reply reading and draft answers; the desk shows state and holds the few decisions a person makes.',
    points: [
      'Skills return JSON validated against a schema; an answer that does not validate is rejected, not repaired',
      'The same backend serves the web desk and Claude Code over MCP, so both refuse the same things',
      'Spend is quoted before it happens, and the scale-or-kill verdict is computed from the campaign’s own rules, never generated',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Claude', 'MCP', 'Smartlead', 'HubSpot'],
    url: 'https://campaign-ops-demo.netlify.app/campaigns',
    shot: '/work/campaign-ops.jpg',
    shotAlt: 'Campaign Ops: the campaign list with stages, verdicts and Smartlead numbers',
  },
  {
    slug: 'enrichment-ops',
    name: 'Enrichment Ops',
    kicker: 'Provider waterfall API',
    summary:
      'Three enrichment APIs (personal email, work email, mobile phone) on one waterfall. A person is checked against our own cache first, then providers are tried in order of cost and hit rate until one answer passes the rules. Every attempt is logged with what it cost.',
    points: [
      'Cache keyed on a normalised LinkedIn profile, so URL variants stop paying for the same person twice',
      'Fails closed: a work address can never come back from the personal-email service',
      'Per-provider hit rate, latency and cost per answer, from one attempts table shared by all three services',
    ],
    stack: ['n8n', 'TypeScript', 'Supabase', 'Postgres', 'Next.js', 'Clay'],
    url: 'https://enrichment-ops-demo.netlify.app',
    shot: '/work/enrichment-ops.jpg',
    shotAlt: 'Enrichment Ops: provider scoreboard with hit rates, credits and spend',
  },
  {
    slug: 'email-ops',
    name: 'Email Ops',
    kicker: 'Deliverability control plane',
    summary:
      'One registry for every sending domain and mailbox across the mailbox providers, the sequencer and DNS. It reconciles them, checks health on a schedule, and gives each domain a computed "ready to send" verdict with the evidence behind it.',
    points: [
      'Joining vendors on the email address surfaces what none of them shows alone: paid-for mailboxes not sending, senders with no source, broken connections',
      'DNS fixes are previewed and applied through Cloudflare only after approval',
      'An embedded assistant and an MCP server read through the same functions as the pages',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Cloudflare API', 'Claude', 'MCP'],
    url: 'https://email-ops-demo.netlify.app',
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
      'A WhatsApp-style view of every conversation a recruiting AI agent has with customers, across Slack, phone calls and email. The team rates replies in place, and the ratings flow back to the agent’s evaluation datasets.',
    points: [],
    stack: ['Next.js', 'Postgres', 'Slack API', 'LangSmith', 'Web Push'],
    url: 'https://agent-chat-demo.netlify.app',
    shot: '/work/agent-chat.jpg',
    shotAlt: 'Agent Chat: a channel conversation between a client team and the agent',
  },
  {
    slug: 'cost-dashboard',
    name: 'Cost Dashboard',
    kicker: 'API and SaaS spend',
    summary:
      'Spend across about twenty AI, enrichment and automation vendors, each billed differently. Daily n8n jobs pull tokens, credit balances and executions into one append-only ledger, reconciled against the monthly invoices.',
    points: [],
    stack: ['n8n', 'Supabase', 'Next.js', 'SVG charts'],
    url: 'https://cost-dashboard-demo.netlify.app',
    shot: '/work/cost-dashboard.jpg',
    shotAlt: 'Cost Dashboard: month-to-date spend, trend and category mix',
  },
]
