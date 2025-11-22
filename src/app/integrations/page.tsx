import prisma from '@/lib/prisma';
import IntegrationsClient from './IntegrationsClient';

export default async function IntegrationsPage() {
  const user = await prisma.user.findFirst({
    where: { email: 'demo@anajak.com' },
  });

  if (!user) return <div>User not found</div>;

  const integrations = await prisma.integration.findMany({
    where: { userId: user.id }
  });

  return <IntegrationsClient initialIntegrations={integrations} />;
}
