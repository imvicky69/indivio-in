/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://indivio.in',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/payment-status', '/payment-page'],
  additionalPaths: async (config) => {
    const result = [];

    // Add pricing page
    result.push({
      loc: '/pricing',
      changefreq: 'weekly',
      priority: 0.9,
    });

    // Add plan detail pages
    const plans = ['starter', 'professional', 'enterprise'];
    plans.forEach(plan => {
      result.push({
        loc: `/plans/${plan}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    return result;
  },
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/payment-status', '/payment-page'],
      },
    ],
  },
};
