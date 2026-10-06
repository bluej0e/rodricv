export type DemoKey = 'email-ops' | 'enrichment-ops' | 'campaign-desk' | 'cost-dashboard' | 'role-cost'

export interface FlowLane {
  label: string
  nodes: { name: string; note?: string }[]
}

export interface Project {
  slug: DemoKey
  tier: 'flagship' | 'supporting'
  title: string
  tagline: string
  period: string
  stack: string[]
  /** One line for the index card. */
  card: string
  problem: string[]
  how: string
  flow: FlowLane[]
  demoIntro: string
  /** What to look at, what to try, what it proves. */
  demoGuide: { look: string; try: string; shows: string }
  decisions: { title: string; body: string }[]
  outcomes: string[]
}

export const workIntro =
  'Five internal tools I designed and built as the sole revenue operations engineer at RodCorp, a recruiting company placing remote talent with US and Canadian companies (the company name is changed here). The production code belongs to the company, so each page is a rebuild: the same architecture and decision logic, running in your browser on made-up data.'

export const engine: FlowLane[] = [
  { label: 'Find', nodes: [{ name: 'Enrichment Ops', note: 'the right address and number for each person, at the lowest cost' }] },
  { label: 'Run', nodes: [{ name: 'Campaign Desk', note: 'plans, launches and judges every outbound test' }] },
  { label: 'Deliver', nodes: [{ name: 'Email Ops', note: 'keeps every domain and mailbox able to reach the inbox' }] },
]

export const projects: Project[] = [
  {
    slug: 'enrichment-ops',
    tier: 'flagship',
    title: 'Enrichment Ops',
    tagline: 'A provider waterfall with cost accounting',
    period: 'Aug — Oct 2026',
    stack: ['n8n (workflows authored in TypeScript)', 'Supabase / Postgres RPCs', 'Next.js', 'Docker'],
    card: 'Three enrichment APIs (personal email, work email, mobile) on one waterfall. Cache first, cheapest provider next, every attempt logged with what it cost.',
    problem: [
      'Candidates were being emailed at their work addresses. The existing integration called one data provider and took the first address it returned, which for most people is the business one. The provider has no "personal only" setting, so the filter had to be ours.',
      'Fixing that properly meant asking several providers, and every provider charges differently. Nobody could say what an answer cost or which vendor was worth its rate.',
    ],
    how: 'A request comes in by webhook. The person is looked up in our own cache first, then the email the caller already had is checked, then paid providers are tried in order of cost and hit rate until one returns an address that passes the acceptance rule. Every attempt, hit or miss, is written to one table with the provider and the price, so the dashboard can show hit rate and cost per answer for each vendor.',
    flow: [
      { label: 'Callers', nodes: [{ name: 'CSV tool' }, { name: 'CRM integration' }, { name: 'Campaign Desk' }] },
      { label: 'Waterfall (n8n)', nodes: [{ name: 'Cache lookup', note: 'normalised LinkedIn key' }, { name: 'Caller-supplied email' }, { name: 'Providers 1…n', note: 'first accepted answer wins' }] },
      { label: 'Postgres', nodes: [{ name: 'enrichment_attempts', note: 'one row per try, with cost' }, { name: 'rejected values' }, { name: 'provider rates' }] },
      { label: 'Read by', nodes: [{ name: 'Per-service dashboards' }, { name: 'Run cost on every API reply' }] },
    ],
    demoIntro: 'Run a batch of 24 people through a five-step waterfall. Then run it again: everyone already found comes back from the cache for nothing. Turn URL normalisation off to see what exact-string matching would have cost.',
    demoGuide: {
      look: "A batch of 24 people going through the waterfall. The scoreboard shows each step's hit rate and what it cost per answer; each person's row opens the full attempt log.",
      try: "Run the batch, then run it again and compare the cost. Reset, turn URL normalisation off, and run it twice more: the five people already in the cache are missed and paid for.",
      shows: "Cache-first lookups on a normalised key, an acceptance rule that rejects work addresses even when a provider charged for them, and cost accounting per attempt.",
    },
    decisions: [
      {
        title: 'Cache on a normalised key, not the raw URL',
        body: 'The same profile was stored as http and https, with and without www, with and without a trailing slash. Exact string matching would have missed roughly three quarters of the existing cache. Every URL is reduced to /in/<slug> before lookup, backed by an expression index, which also collapsed about 12,000 duplicate people.',
      },
      {
        title: 'Fail closed on "is this personal?"',
        body: 'An address counts as personal only if the provider did not label it work, it does not match the person\'s company domain, and it is either on a consumer mailbox or came from a personal-only endpoint. Anything unclassifiable is a miss. Rejecting costs a credit; accepting a work address costs a candidate complaint.',
      },
      {
        title: 'One attempts table, with a type column everyone must group by',
        body: 'Providers are shared across the three services, so the attempts live in one table with an enrichment_type discriminator. It went in before the second and third services, not after: left ungrouped, hit rates average three unrelated waterfalls and nothing errors. The numbers just quietly blend.',
      },
      {
        title: 'A cost model that refuses to blur',
        body: 'Charged on a hit, not a call. A flat-rate provider costs $0 at the margin, which is different from unknown. Unknown is never shown as $0: unpriced hits render with a trailing +. Rates live in a table, so changing one is an update, not a deploy.',
      },
      {
        title: 'Burn the wrong value, not the provider',
        body: 'Every answer is cached, so a wrong one would be served forever. Rejections go into an append-only list keyed on the normalised value: the cache stops serving it, and every provider step refuses it, because two providers re-offered the exact rejected address on the first production run.',
      },
      {
        title: 'Retry the cheap provider before paying the expensive one',
        body: 'The cheapest provider has the tightest rate limit. Under a burst its 429s fell straight through to a provider about ten times the price. It now retries with jittered backoff, honouring Retry-After, before the waterfall moves on.',
      },
    ],
    outcomes: [
      'Candidates stopped receiving business addresses: acceptance is a rule we own, not a vendor field',
      'A repeated batch costs $0 off the cache; cost per answer is visible per provider and per run',
      'Vendor decisions (drop one, reorder, renegotiate) are made from measured hit rate and spend',
    ],
  },
  {
    slug: 'campaign-desk',
    tier: 'flagship',
    title: 'Campaign Desk',
    tagline: 'An agentic desk for outbound campaigns',
    period: 'Sep — Oct 2026',
    stack: ['Next.js 16', 'React 19', 'TypeScript (strict)', 'Tailwind 4', 'Vitest', 'Supabase', 'JSON Schema', 'MCP', 'Claude API'],
    card: 'Claude plans, builds and runs each outbound test through versioned skills; the desk shows state and holds the few decisions a person makes. Verdicts are computed, never generated.',
    problem: [
      'Launching an outbound test meant one person running planning, list building, enrichment, copy, sequencer setup and reply triage by hand, across half a dozen tools. A prototype showed the flow could be driven by an agent. It needed to become a system the team could trust with real spend.',
    ],
    how: 'A request becomes a plan after the planner asks what it could not settle. The plan\'s search brief counts the market and pulls a small test batch; people are scored for fit, enriched, and written to. Copy is checked against house rules, spun, and launched on the sequencer. Replies are classified for sentiment and intent and get a drafted answer. Every morning each campaign\'s numbers are read against its own kill and scale rules.',
    flow: [
      { label: 'Request', nodes: [{ name: 'Desk panel' }, { name: 'Claude Code (MCP)' }] },
      { label: 'Skills (Claude)', nodes: [{ name: 'Planner' }, { name: 'Search + fit score' }, { name: 'Copy + QA + spin' }, { name: 'Reply sentiment / intent / draft' }] },
      { label: 'Typed code', nodes: [{ name: 'Schema validation' }, { name: 'Spend quotes + confirm' }, { name: 'Sequencer, CRM, enrichment' }] },
      { label: 'Person', nodes: [{ name: 'Approve plan + copy' }, { name: 'Answer replies' }, { name: 'Scale or kill' }] },
    ],
    demoIntro: 'The verdict that runs every morning, rebuilt. Change a test\'s numbers or pick a scenario and watch which rule decides. Unknown counts stay unknown; they never become zero.',
    demoGuide: {
      look: "A campaign's test numbers on the left; the verdict and every kill and scale line on the right. The line that decided the verdict is highlighted.",
      try: "Click through the scenarios, then edit a number. Clear a field to make it unknown and watch the verdict wait instead of treating it as zero.",
      shows: "A deterministic rule order (bounce kill first, then meetings, then a scaling channel, then kill only if every channel agrees) that a person can audit line by line.",
    },
    decisions: [
      {
        title: 'A skill is a contract, not a script',
        body: 'Each skill defines what the model produces and how it decides, and ships a JSON Schema for its output. An answer that does not validate is rejected, not repaired. Skills never call a provider, hold a key, spend or send: typed code owns network calls, credentials, spend limits and writes.',
      },
      {
        title: 'One backend behind two doors',
        body: 'The in-app panel and Claude Code (through the desk\'s MCP server) call the same library functions the pages and buttons call. They see the same state and refuse the same things, and every action lands on the activity log under the teammate who took it.',
      },
      {
        title: 'Quote before spending',
        body: 'Pulling and enriching people answer first with what they would cost and only spend when called again with confirm. The same guard applies whether a person clicks or an agent asks.',
      },
      {
        title: 'The verdict is arithmetic',
        body: 'Scale, keep testing, kill or not enough data is worked out the same way every time from the campaign\'s own rules: a bounce kill beats everything, meetings can scale on their own, and kill needs every channel to agree. It recommends; a person makes the call.',
      },
      {
        title: 'Lock what the test measures',
        body: 'After the first send, the audience, search, hypothesis and offer are locked. Changing them mid-test would make the result unreadable.',
      },
      {
        title: 'Reuse people before paying for them',
        body: 'Anyone pulled before is kept in the desk\'s own record. A new batch reuses known people first, but never anyone already on a live campaign, contacted in the last 30 days, or who asked not to be contacted.',
      },
    ],
    outcomes: [
      'One desk from request to verdict; the person reviews a plan, approves copy and answers replies',
      'Skills are versioned and marked draft or trusted; every run records the version it used',
      'Typecheck, tests and production build run on every pull request',
    ],
  },
  {
    slug: 'email-ops',
    tier: 'flagship',
    title: 'Email Ops',
    tagline: 'A control plane for cold-email infrastructure',
    period: 'Jun — Oct 2026',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Auth.js', 'Claude API', 'MCP', 'Cloudflare API', 'Docker'],
    card: 'Every sending domain and mailbox across all vendors in one registry, reconciled, health-checked and given a computed "ready to send" verdict with its evidence.',
    problem: [
      'Cold email for RodCorp\'s brands ran across five vendors: mailbox providers, sequencers and DNS, each with its own dashboard, plus a spreadsheet trying to hold it together. Nobody could answer "which domains are not sending?" or "is this one ready?" without logging into everything.',
      'Worse, campaigns had landed in spam while every domain looked healthy. Passing SPF, DKIM and DMARC is necessary, not sufficient.',
    ],
    how: 'One adapter per vendor maps its API into a shared shape. A sync joins mailboxes across vendors on the email address, which is what exposes the gaps no single vendor can see. A scheduled health pipeline checks authentication records, blacklists and reputation and appends to a history table. The dashboard, an embedded Claude assistant and an MCP server all read through the same getters.',
    flow: [
      { label: 'Vendors', nodes: [{ name: 'Mailbox provider' }, { name: 'Sequencer' }, { name: 'Cloudflare DNS' }, { name: 'DNS, blacklists, Postmaster' }] },
      { label: 'Core', nodes: [{ name: 'Provider adapters', note: 'one file per vendor' }, { name: 'Registry sync + reconciliation' }, { name: 'Health pipeline' }] },
      { label: 'Postgres', nodes: [{ name: 'domains, mailboxes' }, { name: 'health_checks', note: 'append-only' }, { name: 'placement_tests' }] },
      { label: 'Surfaces', nodes: [{ name: 'Dashboard' }, { name: 'Claude assistant' }, { name: 'MCP server' }] },
    ],
    demoIntro: 'Eighteen made-up domains across three sending brands, with faults seeded in. Click a count to filter, click a domain to see why it is or is not ready, and approve a DNS fix to watch the verdict change.',
    demoGuide: {
      look: "Eighteen domains across three RodCorp sending brands. The counts along the top are the reconciliation: gaps that only appear once the mailbox provider and the sequencer are joined.",
      try: "Click \u201cAuth failing\u201d, pick a domain, preview the DNS fix and approve it. The verdict and the counts update. Then open a domain that is not ready for a non-DNS reason.",
      shows: "A readiness verdict computed from six checks with visible evidence, and fixes that are previewed before anything is written.",
    },
    decisions: [
      {
        title: '"Ready to send" is computed, never a flag',
        body: 'A domain is ready only when its mailboxes are loaded into a sender, connected, warmed up, have a sender name and signature, and its authentication passes. The verdict ships with its checklist, so an operator can see exactly what is missing instead of trusting a badge.',
      },
      {
        title: 'Join vendors on the email address',
        body: 'Each vendor only knows its own half. Joining them on the address surfaces what nobody else shows: mailboxes paid for but not sending, mailboxes sending with no known source, broken SMTP connections and lapsing domains.',
      },
      {
        title: 'Health is a score, not pass/fail',
        body: 'All-green records have still landed in spam, so the score\'s ceiling is capped until there is measured placement data. Placement tests are a separate signal by design, and the schema held them before the integration existed.',
      },
      {
        title: 'Fix in place, behind preview and approve',
        body: 'Reconciliation without action is a nicer spreadsheet. Where the app finds a missing record it offers the Cloudflare change, shows the exact record first, and only writes after approval.',
      },
      {
        title: 'The assistant gets the same tools as the pages',
        body: 'The embedded assistant and the MCP server call the getters the pages render from. Read tools are open; anything that costs money or touches production DNS confirms first, and a read-only mode drops the write tools entirely.',
      },
      {
        title: 'Adding a vendor is one file',
        body: 'Every vendor implements one interface with declared capabilities. Vendors without an API degrade to manual entry, and the UI hides actions a vendor cannot support.',
      },
    ],
    outcomes: [
      'Replaced five vendor dashboards and the tracking spreadsheet as the team\'s source of truth',
      'Daily refresh in production; every verdict traceable to the signals behind it',
      'Was the operating view for migrating all sending onto one stack and warming 32 domains',
    ],
  },
  {
    slug: 'cost-dashboard',
    tier: 'supporting',
    title: 'Cost Dashboard',
    tagline: 'One pane for AI and data-vendor spend',
    period: '2026',
    stack: ['n8n', 'Supabase (RLS)', 'Next.js', 'hand-rolled SVG charts'],
    card: 'Spend across about twenty AI, enrichment and automation vendors, each billing differently, pulled daily into one append-only ledger and reconciled against invoices.',
    problem: [
      'The team paid around twenty vendors that each billed differently: tokens, credits, executions, flat monthly fees. "What did last month cost, and where?" took an afternoon of logging into dashboards.',
    ],
    how: 'Three ingestion patterns cover every vendor. Token-based vendors are pulled from their usage APIs. Credit-only vendors are snapshotted daily and consumption is the difference between snapshots. Automation platforms are counted by executions. A daily n8n schedule writes to append-only tables; the dashboard reads through row-level security, with a simpler view for leadership.',
    flow: [
      { label: 'Vendors', nodes: [{ name: 'Token usage APIs' }, { name: 'Credit balances' }, { name: 'Execution counts' }, { name: 'Flat fees' }] },
      { label: 'n8n (daily)', nodes: [{ name: 'Token pull' }, { name: 'Snapshot diff', note: 'top-up aware' }, { name: 'Execution count' }] },
      { label: 'Postgres', nodes: [{ name: 'usage_events', note: 'append-only' }, { name: 'balance_snapshots' }, { name: 'monthly_invoices' }] },
      { label: 'Read by', nodes: [{ name: 'Operator view' }, { name: 'Executive view' }] },
    ],
    demoIntro: 'A credit-only vendor reports a balance, not usage. Turn top-up detection off to see what a naive difference does on the day someone buys credits. Below, monthly spend is reconciled against invoices.',
    demoGuide: {
      look: "Two weeks of daily balance snapshots from a credit-only vendor, turned into daily usage, and a month of spend reconciled against invoices.",
      try: "Turn top-up detection off and watch day 8 and the total. Then look for the flagged vendor in the invoice table.",
      shows: "Why consumption has to be derived carefully when a vendor only reports a balance, and why the invoice stays the final check.",
    },
    decisions: [
      { title: 'Append-only events', body: 'Usage is never updated in place. Backfills are inserts, history is never lost, and a bad day can be traced to the rows that made it.' },
      { title: 'Snapshot diffs that know about top-ups', body: 'For vendors that only expose a balance, consumption is yesterday minus today. A purchase makes that negative, so a rise in balance is treated as a top-up and the day\'s usage is worked out around it.' },
      { title: 'Writes and reads with different keys', body: 'n8n writes with the service key; the dashboard reads with the public key through row-level security, and credentials are locked even from signed-in users.' },
      { title: 'Reconcile against the invoice', body: 'Once a month the real invoice is logged. Any vendor whose API-derived total drifts more than 15% from it is flagged, which catches pricing changes the APIs do not announce.' },
    ],
    outcomes: [
      'Monthly spend by vendor and category without opening a single vendor dashboard',
      'A mock mode so the UI could be reviewed before any ingestion was live',
    ],
  },
  {
    slug: 'role-cost',
    tier: 'supporting',
    title: 'Role Cost Tracker',
    tagline: 'Outbound-to-pipeline attribution, per open role',
    period: '2026',
    stack: ['Next.js', 'Sequencer API', 'CRM API', 'no database'],
    card: 'Funnel and cost for every open role, joined from the sequencer and the CRM, where the only link between a campaign and a role is a name recruiters type by hand.',
    problem: [
      'Leadership wanted reach, reply rate and cost per open role. The sequencer has no job ID: a campaign is tied to a role only by a naming convention, "(Recruiter) - Client - Role", typed by a dozen recruiters, each with their own habits.',
    ],
    how: 'Two sequencer API calls an hour fetch every campaign and its raw counts. Names are parsed into recruiter, client and role, campaigns are grouped by role, and rates are derived from the summed counts. A CRM API adds pipeline stages and cost per role. There is no database: the tool is a live read with an hourly cache.',
    flow: [
      { label: 'Sources', nodes: [{ name: 'Campaign list' }, { name: 'Campaign stats' }, { name: 'CRM jobs + stages' }] },
      { label: 'Rollup', nodes: [{ name: 'Name parser' }, { name: 'Group by role' }, { name: 'Rates from raw counts' }] },
      { label: 'Checks', nodes: [{ name: 'Conservation: every lead accounted for' }, { name: 'Plausibility gate on costs' }] },
      { label: 'Read by', nodes: [{ name: 'Role table' }, { name: 'Unattributed list + rename proposals' }] },
    ],
    demoIntro: 'Edit the campaign names on the left. Each line is parsed with the production rules; roles roll up on the right, and anything that cannot be attributed says why, with a rename when the fix is purely mechanical.',
    demoGuide: {
      look: "Campaign names as recruiters typed them, with their counts, rolled up into one row per role. Anything the parser cannot attribute is listed with the reason.",
      try: "Fix one of the unattributed names by hand, or break a good one, and watch coverage and the role table change.",
      shows: "Attribution rules taken from real failure modes, rates derived from raw counts, and a parser that refuses to invent a client.",
    },
    decisions: [
      { title: 'Parsing rules come from measured failures', body: 'Split on a dash with any spacing, casefold the recruiter, strip "copy" suffixes before splitting, and merge copies into their role, because dozens of them carried real volume.' },
      { title: 'Nothing is silently dropped', body: 'A verify script asserts that every lead in the API response is attributed, listed as unattributed with a reason, or explicitly excluded. 97.7% of contacted candidates are attributed.' },
      { title: 'Never read the vendor\'s rates', body: 'The sequencer\'s reply rate switches denominator depending on whether open tracking is on, and one live campaign reported 200%. Every rate here is derived from summed raw counts.' },
      { title: 'Refuse to invent data', body: 'The rename tool fixes punctuation, never content. A name with no client is listed, not guessed. A metric nobody records shows as an explicit empty state, not 0%.' },
      { title: 'Every cost is a floor, and the page says so', body: 'One cost line is not recorded anywhere, so totals are labelled as minimums. A plausibility gate excludes jobs with impossible interview durations, kept separate from the API-version check: merging the two once published $9,879 against a real $743.' },
    ],
    outcomes: [
      '97.7% of contacted candidates attributed to a role, with the rest listed and fixable',
      'Renaming a campaign moves its volume onto the dashboard within the hour',
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
