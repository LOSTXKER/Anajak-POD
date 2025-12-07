import { getIntegrations } from '@/lib/mockData';
import IntegrationsClient from './IntegrationsClient';

export default function IntegrationsPage() {
  const integrations = getIntegrations();

  return <IntegrationsClient initialIntegrations={integrations} />;
}
