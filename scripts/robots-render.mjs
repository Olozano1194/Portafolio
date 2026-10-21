/**
 * Render robots.txt content.
 * Allows all crawlers and includes absolute sitemap URL.
 */

/**
 * Render robots.txt string
 * @param {string} origin - Base URL (e.g., "https://example.com")
 * @returns {string} robots.txt content
 */
export function renderRobotsTxt(origin) {
  const baseUrl = origin.replace(/\/$/, ""); // Ensure no trailing slash
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  return `# robots.txt
User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
}