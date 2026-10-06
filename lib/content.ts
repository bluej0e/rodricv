export const profile = {
  name: 'Rodrigo Viola',
  role: 'GTM Engineer · Revenue Operations',
  location: 'Montevideo, Uruguay — works remote',
  citizenship: 'Canadian, Italian (EU) and Uruguayan citizen. No sponsorship needed in Canada or the EU.',
  email: 'rv.rodrigo.viola@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rodrigoviola/',
  github: 'https://github.com/bluej0e',
}

export const summary =
  'I build the systems that replace manual go-to-market work. Most recently I ran revenue operations at a recruiting company placing remote talent with companies in the US and Canada, where I owned the outbound engine, the enrichment layer and the email infrastructure across five brands. Before that, six years in growth and marketing operations — which is why the systems I build get used instead of shelved.'


export const experience = [
  {
    company: 'TalentStream',
    role: 'Revenue Operations Manager',
    period: 'Aug 2025 — Sep 2026',
    place: 'Remote',
    description:
      'Sole revenue operations owner for a recruiting company placing remote talent with companies in the US and Canada. Owned outbound, enrichment and email infrastructure across five brands.',
    work: [
      'Built the outbound engine end to end, from webhook intake through campaign push, with eight campaign lists running off one orchestration table',
      'Built the enrichment layer on Clay and Supabase: a read-through cache in front of a five-provider waterfall, with async submit/callback pairs in n8n',
      'Migrated all sending and warm-up off two legacy platforms onto one stack and warmed 32 domains into production',
      'Diagnosed and cleared a Microsoft block that was suppressing about 40% of send volume',
      'Built reply classification and routing in n8n, replacing manual inbox triage',
      'Built an LLM scoring pipeline that graded interview recordings and posted feedback to Slack',
      'Owned deliverability end to end: SPF, DKIM, DMARC, bounce rates and blacklist remediation',
    ],
  },
  {
    company: 'VAIRIX Software Development',
    role: 'Marketing Executive',
    period: 'Aug 2022 — Dec 2024',
    place: 'Montevideo, Uruguay',
    description:
      'Owned marketing for a software development agency serving US clients, and built the automation underneath it.',
    work: [
      'Built lead generation and marketing operations workflows in n8n, Make and custom API integrations',
      'Built AI-assisted content engines for long-form and technical content',
      'Integrated HubSpot, Webflow and the wider stack into one connected system',
      'Ran SEO and technical web performance work, and scaled outbound email programs',
    ],
  },
  {
    company: 'TowerHouse Studio',
    role: 'Marketing Manager',
    period: 'Apr 2021 — Apr 2022',
    place: 'Montevideo, Uruguay',
    description: 'Led marketing for a digital studio.',
    work: [
      'Ran demand generation and the studio web presence',
      'Delivered client-facing campaign work end to end',
    ],
  },
  {
    company: 'Power Global Innovation',
    role: 'CMO',
    period: 'Dec 2019 — Feb 2021',
    place: 'Barcelona, Spain',
    description: 'Led marketing for an early-stage company.',
    work: [
      'Owned positioning and channel strategy',
      'Ran execution across a small team',
    ],
  },
  {
    company: '1UP.uy',
    role: 'Founder and independent consultant',
    period: 'Jul 2017 — Dec 2019',
    place: 'Uruguay',
    description: 'Independent consulting under a personal brand.',
    work: [
      'Consulted for iGaming operators in Sweden and Malta on market research, growth and new market entry',
      'Delivered web, brand and campaign work for smaller clients',
    ],
  },
  {
    company: 'HelloNets',
    role: 'Product Manager',
    period: 'Nov 2015 — Jul 2017',
    place: 'Montevideo, Uruguay',
    description: 'Ran an iGaming affiliate network across Latin America.',
    work: [
      'Ran development and operation of a network of 80+ sites',
      'Owned SEO/SEM, web development and growth for the network',
    ],
  },
]

export const systems = [
  {
    title: 'Outbound engine',
    slug: 'campaign-ops',
    summary:
      'Job postings arrive by webhook, get prefiltered and classified, contacts are found and enriched, campaigns go out. Eight campaign lists ran off one shared orchestration table.',
  },
  {
    title: 'Enrichment layer',
    slug: 'enrichment-ops',
    summary:
      'A read-through cache in Supabase in front of a five-provider waterfall in Clay. Providers sequenced by hit rate and cost; repeat lookups on cached profiles cost nothing.',
  },
  {
    title: 'Email infrastructure',
    slug: 'email-ops',
    summary:
      'Sending and warm-up consolidated onto one stack across five brands. DNS records, domain warm-up, bounce rates, blacklist remediation, and reply routing by sentiment.',
  },
]

export const skills = [
  { group: 'Automation', items: ['n8n', 'Make', 'Zapier', 'webhooks', 'REST APIs', 'event-driven design'] },
  { group: 'Data', items: ['Supabase', 'PostgreSQL', 'SQL', 'MongoDB', 'Prisma'] },
  { group: 'GTM tooling', items: ['Clay', 'SmartLead', 'HubSpot', 'GoHighLevel', 'ICP scoring', 'lead routing'] },
  { group: 'Deliverability', items: ['SPF', 'DKIM', 'DMARC', 'domain warm-up', 'blacklist remediation'] },
  { group: 'AI / LLM', items: ['Anthropic', 'OpenAI', 'OpenRouter', 'structured outputs', 'LLM-as-judge'] },
  { group: 'Web', items: ['JavaScript', 'TypeScript', 'Next.js', 'Cloudflare', 'Playwright', 'Webflow'] },
]

export const education = [
  { school: 'Universidad ORT Uruguay', degree: 'Marketing Analyst', period: '2015 — 2017' },
  { school: 'Algonquin College', degree: 'Advertising', period: '2010 — 2013' },
  { school: 'Sheridan College', degree: 'Marketing', period: '2008 — 2009' },
]

export const languages = 'English (native/bilingual) · Spanish (native/bilingual)'
