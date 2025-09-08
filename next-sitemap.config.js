/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://vamsicheruku.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin', '/api/*'],
      },
    ],
    additionalSitemaps: [
      'https://vamsicheruku.dev/sitemap.xml',
    ],
  },
}