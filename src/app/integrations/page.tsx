import { getIntegrations as getIntegrationsMock } from '@/lib/mockData';
import { getIntegrations as getIntegrationsFromDB } from '@/lib/db/integrations';
import { createClient } from '@/lib/supabase/server';
import IntegrationsClient from './IntegrationsClient';

export default async function IntegrationsPage() {
  let integrations;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      integrations = await getIntegrationsFromDB(user.id);
    }
  } catch {
    // Database not available
  }

  if (!integrations) {
    integrations = getIntegrationsMock();
  }

  return <IntegrationsClient initialIntegrations={integrations} />;
}
