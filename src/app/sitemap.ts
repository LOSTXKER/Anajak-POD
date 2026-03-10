import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anajak.com'

  const staticPages = [
    '',
    '/catalog',
    '/designer',
    '/features',
    '/pricing',
    '/about',
    '/contact',
    '/corporate',
    '/affiliate',
    '/use-cases/graduation',
    '/use-cases/event',
    '/use-cases/team',
    '/use-cases/uniform',
    '/use-cases/band',
  ]

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly' as const,
    priority: path === '' ? 1 : path === '/catalog' ? 0.9 : 0.7,
  }))
}
