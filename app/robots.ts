import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/services',
          '/projects',
          '/contact',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/*.json$',
          '/*?*', // Prevents crawling of URLs with query parameters
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/admin/', '/api/'],
      }
    ],
    sitemap: 'https://codemates.in/sitemap.xml',
  };
}
