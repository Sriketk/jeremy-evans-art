import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Only disallow private routes if they exist
    },
    sitemap: 'https://www.jeremyevansart.com/sitemap.xml',
    host: 'https://www.jeremyevansart.com',
  };
}
