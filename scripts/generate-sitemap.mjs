#!/usr/bin/env node
/**
 * Generate sitemap.xml and robots.txt at build time.
 * Reads VITE_SITE_URL from environment, builds route manifest from proyectos data,
 * and writes public/sitemap.xml and public/robots.txt.
 *
 * Usage: VITE_SITE_URL=https://example.com node scripts/generate-sitemap.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { buildRouteManifest } from "./sitemap-manifest.mjs";
import { renderSitemapXml } from "./sitemap-render.mjs";
import { renderRobotsTxt } from "./robots-render.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Validate and get site URL from environment
 * @returns {string} Validated site URL
 * @throws {Error} If VITE_SITE_URL is not set or invalid
 */
function getSiteUrl() {
  const siteUrl = process.env.VITE_SITE_URL;
  if (!siteUrl) {
    console.error("ERROR: VITE_SITE_URL environment variable is required");
    console.error("Usage: VITE_SITE_URL=https://your-domain.com node scripts/generate-sitemap.mjs");
    process.exit(1);
  }

  // Basic URL validation
  try {
    const url = new URL(siteUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("Invalid protocol");
    }
    return siteUrl;
  } catch {
    console.error(`ERROR: VITE_SITE_URL must be a valid URL (got: "${siteUrl}")`);
    process.exit(1);
  }
}

/**
 * Main generation function
 */
export async function generate() {
  const siteUrl = getSiteUrl();

  console.log(`Generating sitemap and robots.txt for: ${siteUrl}`);

  // Build route manifest
  const routes = await buildRouteManifest();
  console.log(`Found ${routes.length} routes:`);
  for (const { route, lastmod } of routes) {
    console.log(`  ${route} (lastmod: ${lastmod})`);
  }

  // Generate sitemap.xml
  const sitemapXml = renderSitemapXml(routes, siteUrl);
  const publicDir = resolve(__dirname, "..", "public");
  mkdirSync(publicDir, { recursive: true });

  const sitemapPath = resolve(publicDir, "sitemap.xml");
  writeFileSync(sitemapPath, sitemapXml, "utf-8");
  console.log(`✓ Written: ${sitemapPath}`);

  // Generate robots.txt
  const robotsTxt = renderRobotsTxt(siteUrl);
  const robotsPath = resolve(publicDir, "robots.txt");
  writeFileSync(robotsPath, robotsTxt, "utf-8");
  console.log(`✓ Written: ${robotsPath}`);

  console.log("Generation complete!");
}

// Run if executed directly (not imported)
const scriptPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === scriptPath) {
  generate().catch((err) => {
    console.error("Generation failed:", err);
    process.exit(1);
  });
}