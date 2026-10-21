/**
 * Render sitemap XML from routes array.
 * Produces valid sitemap.xml with absolute URLs, ISO lastmod, changefreq, and priority.
 */

/**
 * Render sitemap XML string
 * @param {Array<{route: string, lastmod: string}>} routes - Array of route objects
 * @param {string} origin - Base URL (e.g., "https://example.com")
 * @param {string} [lastmod] - Optional override for lastmod (defaults to each route's lastmod)
 * @returns {string} Valid sitemap XML
 */
export function renderSitemapXml(routes, origin, lastmod) {
  const baseUrl = origin.replace(/\/$/, ""); // Ensure no trailing slash

  const urlEntries = routes
    .map(({ route, lastmod: routeLastmod }) => {
      const loc = `${baseUrl}${route}`;
      const effectiveLastmod = lastmod || routeLastmod;
      const changefreq = route === "/" ? "weekly" : "monthly";
      const priority = route === "/" ? "1.0" : "0.8";

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${effectiveLastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Escape XML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeXml(str) {
  return str
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'");
}