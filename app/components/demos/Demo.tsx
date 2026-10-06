import type { DemoKey } from '../../../lib/work'
import EmailOpsDemo from './EmailOpsDemo'
import EnrichmentDemo from './EnrichmentDemo'
import CampaignDemo from './CampaignDemo'
import CostDemo from './CostDemo'
import RoleDemo from './RoleDemo'

const DEMOS: Record<DemoKey, () => JSX.Element> = {
  'email-ops': EmailOpsDemo,
  'enrichment-ops': EnrichmentDemo,
  'campaign-desk': CampaignDemo,
  'cost-dashboard': CostDemo,
  'role-cost': RoleDemo,
}

export default function Demo({ which }: { which: DemoKey }) {
  const D = DEMOS[which]
  return <D />
}
