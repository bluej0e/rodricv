export const profile = {
  name: 'Rodrigo Viola',
  role: 'GTM Engineer',
  positioning:
    'I build the systems that replace manual go-to-market work — outbound engines, enrichment layers, and the email infrastructure underneath them.',
  location: 'Montevideo, Uruguay · works remote',
  citizenship: 'Canadian, Italian (EU) and Uruguayan citizen. No sponsorship needed in Canada or the EU.',
  email: 'rv.rodrigo.viola@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rodrigoviola/',
  github: 'https://github.com/bluej0e',
}

/** The hero: the outbound engine as a stage flow. */
export const pipeline = [
  { stage: 'job posting', note: 'webhook intake' },
  { stage: 'prefilter', note: 'recruiters, agencies' },
  { stage: 'classify', note: 'niche, company size' },
  { stage: 'find contacts', note: 'LLM selection' },
  { stage: 'enrich', note: 'five-provider waterfall' },
  { stage: 'send', note: '32 warmed domains' },
]

export const systems = [
  {
    title: 'Outbound engine',
    summary:
      'Job postings arrive by webhook, get prefiltered and classified, contacts are found and enriched, campaigns go out. Eight campaign lists ran off one orchestration table.',
    detail: [
      ['Intake', 'Webhook, deduplicated against prior postings'],
      ['Classification', 'LLM pass for niche and company size'],
      ['Selection', 'Contact search, then an LLM picks the right person'],
      ['Gating', 'Enrichment only fires when the record clears the filter'],
    ] as const,
  },
  {
    title: 'Enrichment layer',
    summary:
      'A read-through cache in Supabase in front of a five-provider waterfall in Clay, with async submit/callback pairs in n8n. Repeat lookups on cached profiles cost nothing.',
    detail: [
      ['Cache', 'Supabase, with URL alias resolution'],
      ['Waterfall', 'Providers sequenced by hit rate and cost'],
      ['Limits', 'Per-company contact caps set after a targeting audit'],
      ['Fallback', 'Primary/secondary provider per record type'],
    ] as const,
  },
  {
    title: 'Email infrastructure',
    summary:
      'Sending and warm-up consolidated onto one stack across five brands. Deliverability owned end to end: DNS records, warm-up, bounce rates, blacklist remediation.',
    detail: [
      ['Records', 'SPF, DKIM, DMARC across every sending domain'],
      ['Warm-up', '32 domains warmed into production'],
      ['Incident', 'Cleared a Microsoft block suppressing ~40% of volume'],
      ['Replies', 'Classified by sentiment and routed to the right channel'],
    ] as const,
  },
]

export const experience = [
  {
    company: 'TalentStream',
    role: 'Revenue Operations Manager',
    period: '2025 — 2026',
    place: 'Remote',
    description:
      'Sole revenue operations owner for a recruiting company placing remote talent with companies in the US and Canada. Owned outbound, enrichment and email infrastructure across five brands.',
    work: [
      'Built the outbound engine end to end, from webhook intake through campaign push',
      'Built the enrichment layer on Clay and Supabase with a read-through cache',
      'Migrated sending and warm-up off two legacy platforms onto one stack',
      'Diagnosed and cleared a Microsoft block that was suppressing about 40% of send volume',
      'Built reply classification and routing, replacing manual inbox triage',
      'Built an LLM scoring pipeline that graded interview recordings and posted feedback to Slack',
    ],
  },
  {
    company: 'VAIRIX Software Development',
    role: 'Marketing Executive',
    period: '2022 — 2024',
    place: 'Montevideo, Uruguay',
    description:
      'Owned marketing for a software development agency serving US clients, and built the automation underneath it.',
    work: [
      'Built lead generation and marketing operations workflows in n8n and Make',
      'Integrated HubSpot, Webflow and the wider stack into one connected system',
      'Ran SEO and technical web performance work, and scaled outbound email programs',
    ],
  },
  {
    company: 'TowerHouse Studio',
    role: 'Marketing Manager',
    period: '2021 — 2022',
    place: 'Montevideo, Uruguay',
    description: 'Led marketing for a digital studio: demand generation, web presence and client campaign work.',
    work: [],
  },
  {
    company: 'Power Global Innovation',
    role: 'CMO',
    period: '2019 — 2021',
    place: 'Barcelona, Spain',
    description: 'Led marketing for an early-stage company: positioning, channel strategy and execution across a small team.',
    work: [],
  },
  {
    company: '1UP.uy',
    role: 'Founder and consultant',
    period: '2017 — 2019',
    place: 'Uruguay',
    description:
      'Consulted for iGaming operators in Sweden and Malta on market research, growth and new market entry.',
    work: [],
  },
  {
    company: 'HelloNets',
    role: 'Product Manager',
    period: '2015 — 2017',
    place: 'Montevideo, Uruguay',
    description:
      'Ran development and operation of an iGaming affiliate network of 80+ sites across Latin America.',
    work: [],
  },
]

export const stack = [
  { group: 'Orchestration', items: ['n8n', 'Make', 'Zapier', 'webhooks', 'REST APIs'] },
  { group: 'Data', items: ['Supabase', 'PostgreSQL', 'SQL', 'MongoDB', 'Prisma'] },
  { group: 'GTM', items: ['Clay', 'SmartLead', 'HubSpot', 'GoHighLevel'] },
  { group: 'Deliverability', items: ['SPF', 'DKIM', 'DMARC', 'domain warm-up', 'blacklist remediation'] },
  { group: 'LLM', items: ['Anthropic', 'OpenAI', 'OpenRouter', 'structured outputs', 'LLM-as-judge'] },
  { group: 'Web', items: ['JavaScript', 'TypeScript', 'Next.js', 'Cloudflare', 'Playwright'] },
]

export const education = [
  { school: 'Universidad ORT Uruguay', degree: 'Marketing Analyst', period: '2015 — 2017' },
  { school: 'Algonquin College', degree: 'Advertising', period: '2010 — 2013' },
  { school: 'Sheridan College', degree: 'Marketing', period: '2008 — 2009' },
]
