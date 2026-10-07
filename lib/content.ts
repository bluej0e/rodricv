export const profile = {
  name: 'Rodrigo Viola',
  role: 'GTM Engineer · Revenue Operations',
  location: 'Montevideo, Uruguay · Remote',
  citizenship: 'Canadian, Italian (EU) and Uruguayan citizen. No sponsorship needed in Canada or the EU.',
  email: 'rv.rodrigo.viola@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rodrigoviola/',
  github: 'https://github.com/bluej0e',
  site: 'https://rodrigo-viola.com',
  pdf: '/Rodrigo_Viola_CV.pdf',
}

export const summary =
  'I build the tools behind outbound: how campaigns get planned and launched, how the right contacts get found, and how the email actually gets delivered. Most recently I ran revenue operations on my own at a recruiting company, across five brands. Before that I spent six years in growth and marketing operations, which is why the systems I build get used instead of shelved.'

export interface Job {
  company: string
  role: string
  period: string
  place: string
  description: string
  work: string[]
}

export const experience: Job[] = [
  {
    company: 'TalentStream',
    role: 'Revenue Operations Manager',
    period: 'Aug 2025 – Sep 2026',
    place: 'Remote',
    description:
      'Sole revenue operations owner for a recruiting company placing remote talent with US and Canadian companies. Owned outbound, enrichment and email infrastructure across five brands.',
    work: [
      'Built Campaign Ops, where we planned, launched and tracked every outbound campaign. Claude handled the planning, prospect search, copy and reply drafts, and the team approved each step',
      'Built Enrichment Ops, an API that finds personal emails, work emails and phone numbers by checking our own data first, then trying paid providers in order of cost',
      'Built Email Ops to track every sending domain and mailbox in one place, replacing five vendor dashboards and a spreadsheet',
      'Moved all sending and warm-up from two old platforms onto one stack and warmed 32 domains into production',
      'Found and fixed a Microsoft block that was stopping about 40% of our emails',
      'Built the outbound flow for new job postings, from the incoming webhook to the live campaign, running eight campaign lists from one table',
      'Set up automatic reply sorting in n8n, so nobody had to triage the inbox by hand',
      'Built a pipeline that scored interview recordings with an LLM and posted feedback to Slack, and a tool to monitor our AI recruiting agent’s conversations',
      'Built a dashboard tracking our spend across about twenty AI, data and automation vendors',
    ],
  },
  {
    company: 'VAIRIX Software Development',
    role: 'Marketing Executive',
    period: 'Aug 2022 – Dec 2024',
    place: 'Montevideo, Uruguay',
    description:
      'Owned marketing for a software development agency serving US clients, and built the automation underneath it.',
    work: [
      'Built lead generation and marketing operations workflows in n8n, Make and custom API integrations',
      'Built AI-assisted content engines for long-form and technical content',
      'Connected HubSpot, Webflow and the wider stack into one system',
      'Ran SEO and technical web performance work, and scaled outbound email programs',
    ],
  },
]

export const earlier = [
  { role: 'Marketing Manager', company: 'TowerHouse Studio', period: 'Apr 2021 – Apr 2022', place: 'Montevideo', line: 'Led marketing for a digital studio: demand generation, web presence and client campaigns.' },
  { role: 'CMO', company: 'Power Global Innovation', period: 'Dec 2019 – Feb 2021', place: 'Barcelona', line: 'Led positioning, channel strategy and a small marketing team at an early-stage company.' },
  { role: 'Founder and consultant', company: '1UP.uy', period: 'Jul 2017 – Dec 2019', place: 'Uruguay', line: 'Advised iGaming operators in Sweden and Malta on market research, growth and market entry.' },
  { role: 'Product Manager', company: 'HelloNets', period: 'Nov 2015 – Jul 2017', place: 'Montevideo', line: 'Ran development, SEO/SEM and growth for 80+ iGaming affiliate sites in Latin America.' },
]

export const skills = [
  { group: 'AI and agents', items: ['Claude API', 'Claude Code', 'MCP', 'OpenAI', 'OpenRouter', 'structured outputs', 'LLM-as-judge'] },
  { group: 'Automation', items: ['n8n', 'Make', 'Zapier', 'webhooks', 'REST APIs', 'event-driven design'] },
  { group: 'GTM tooling', items: ['Clay', 'Smartlead', 'HubSpot', 'Crustdata', 'GoHighLevel', 'ICP scoring', 'lead routing'] },
  { group: 'Deliverability', items: ['SPF', 'DKIM', 'DMARC', 'domain warm-up', 'inbox placement testing', 'blacklist remediation'] },
  { group: 'Data', items: ['Supabase', 'PostgreSQL', 'SQL', 'MongoDB', 'Prisma'] },
  { group: 'Web', items: ['TypeScript', 'Next.js', 'React', 'Cloudflare', 'Playwright', 'Webflow'] },
]

export const education = [
  { school: 'Universidad ORT Uruguay', degree: 'Marketing Analyst', period: '2015 – 2017' },
  { school: 'Algonquin College, Ottawa', degree: 'Advertising', period: '2010 – 2013' },
  { school: 'Sheridan College, Toronto', degree: 'Marketing', period: '2008 – 2009' },
]

export const languages = 'English and Spanish, both native'
