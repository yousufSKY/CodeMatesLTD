/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://codemates.in',
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false, // Not needed for smaller sites
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
  },
  // Transform the URLs as needed
  transform: async (config, path) => {
    // Custom priority and changefreq for specific paths
    const priorities = {
      '/': 1.0,
      '/about': 0.8,
      '/services': 0.8,
      '/projects': 0.8,
      '/contact': 0.5,
    };

    const changefreqs = {
      '/': 'yearly',
      '/about': 'monthly',
      '/services': 'monthly',
      '/projects': 'weekly',
      '/contact': 'yearly',
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || 'monthly',
      priority: priorities[path] || 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};
