/**
 * Tests for sitemap and robots.txt generation.
 * Run with: npx vitest run scripts/__tests__/generate-sitemap.test.mjs
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Import modules to test
import { buildRouteManifest } from "../sitemap-manifest.mjs";
import { renderSitemapXml } from "../sitemap-render.mjs";
import { renderRobotsTxt } from "../robots-render.mjs";

describe("sitemap-manifest", () => {
  it("buildRouteManifest returns exactly 7 routes", async () => {
    const routes = await buildRouteManifest();
    expect(routes).toHaveLength(7);
  });

  it("includes root route /", async () => {
    const routes = await buildRouteManifest();
    const rootRoute = routes.find((r) => r.route === "/");
    expect(rootRoute).toBeDefined();
    expect(rootRoute.route).toBe("/");
    // lastmod should be today's date in ISO format (YYYY-MM-DD)
    expect(rootRoute.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("includes video routes for projects with tipo === Video", async () => {
    const routes = await buildRouteManifest();
    const videoRoutes = routes.filter((r) => r.route.startsWith("/videos/"));
    expect(videoRoutes).toHaveLength(2);
    const videoIds = videoRoutes.map((r) => r.route.split("/videos/")[1]).sort();
    expect(videoIds).toEqual(["2", "3"]);
  });

  it("includes demo routes for projects with imgDemo", async () => {
    const routes = await buildRouteManifest();
    const demoRoutes = routes.filter((r) => r.route.startsWith("/demo/"));
    expect(demoRoutes).toHaveLength(4);
    const demoIds = demoRoutes.map((r) => r.route.split("/demo/")[1]).sort();
    expect(demoIds).toEqual(["1", "4", "5", "6"]);
  });

  it("all routes have valid lastmod format (YYYY-MM-DD)", async () => {
    const routes = await buildRouteManifest();
    for (const { lastmod } of routes) {
      expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("sitemap-render", () => {
  const mockRoutes = [
    { route: "/", lastmod: "2026-01-15" },
    { route: "/videos/2", lastmod: "2023-01-01" },
    { route: "/videos/3", lastmod: "2024-01-01" },
    { route: "/demo/1", lastmod: "2026-01-01" },
    { route: "/demo/4", lastmod: "2024-01-01" },
    { route: "/demo/5", lastmod: "2023-01-01" },
    { route: "/demo/6", lastmod: "2026-01-01" },
  ];
  const origin = "https://example.com";

  it("produces valid XML with xml declaration", () => {
    const xml = renderSitemapXml(mockRoutes, origin);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it("includes all 7 routes as <url> entries", () => {
    const xml = renderSitemapXml(mockRoutes, origin);
    const urlMatches = xml.match(/<url>/g);
    expect(urlMatches).toHaveLength(7);
  });

  it("uses absolute URLs in <loc> with origin", () => {
    const xml = renderSitemapXml(mockRoutes, origin);
    expect(xml).toContain("<loc>https://example.com/</loc>");
    expect(xml).toContain("<loc>https://example.com/videos/2</loc>");
    expect(xml).toContain("<loc>https://example.com/demo/1</loc>");
  });

  it("uses ISO format for <lastmod>", () => {
    const xml = renderSitemapXml(mockRoutes, origin);
    expect(xml).toContain("<lastmod>2026-01-15</lastmod>");
    expect(xml).toContain("<lastmod>2023-01-01</lastmod>");
  });

  it("sets changefreq and priority for root route", () => {
    const xml = renderSitemapXml(mockRoutes, origin);
    // Root route should have weekly/1.0
    const rootSection = xml.substring(
      xml.indexOf("<loc>https://example.com/</loc>"),
      xml.indexOf("</url>", xml.indexOf("<loc>https://example.com/</loc>")) + 6
    );
    expect(rootSection).toContain("<changefreq>weekly</changefreq>");
    expect(rootSection).toContain("<priority>1.0</priority>");
  });

  it("sets changefreq and priority for non-root routes", () => {
    const xml = renderSitemapXml(mockRoutes, origin);
    // Non-root routes should have monthly/0.8
    const videoSection = xml.substring(
      xml.indexOf("<loc>https://example.com/videos/2</loc>"),
      xml.indexOf("</url>", xml.indexOf("<loc>https://example.com/videos/2</loc>")) + 6
    );
    expect(videoSection).toContain("<changefreq>monthly</changefreq>");
    expect(videoSection).toContain("<priority>0.8</priority>");
  });

  it("overrides lastmod when provided", () => {
    const xml = renderSitemapXml(mockRoutes, origin, "2025-06-15");
    // All routes should have the overridden lastmod
    const lastmodMatches = xml.match(/<lastmod>2025-06-15<\/lastmod>/g);
    expect(lastmodMatches).toHaveLength(7);
  });

  it("handles origin with trailing slash", () => {
    const xml = renderSitemapXml(mockRoutes, "https://example.com/");
    expect(xml).toContain("<loc>https://example.com/</loc>");
    expect(xml).not.toContain("https://example.com//");
  });
});

describe("robots-render", () => {
  it("allows all user agents", () => {
    const txt = renderRobotsTxt("https://example.com");
    expect(txt).toContain("User-agent: *");
    expect(txt).toContain("Allow: /");
  });

  it("includes absolute sitemap URL", () => {
    const txt = renderRobotsTxt("https://example.com");
    expect(txt).toContain("Sitemap: https://example.com/sitemap.xml");
  });

  it("handles origin with trailing slash", () => {
    const txt = renderRobotsTxt("https://example.com/");
    expect(txt).toContain("Sitemap: https://example.com/sitemap.xml");
    expect(txt).not.toContain("https://example.com//sitemap.xml");
  });

  it("does not include Disallow rules", () => {
    const txt = renderRobotsTxt("https://example.com");
    expect(txt).not.toContain("Disallow:");
  });
});

describe("generate-sitemap main script", () => {
  const originalEnv = process.env.VITE_SITE_URL;
  const originalExit = process.exit;
  const originalError = console.error;

  beforeEach(() => {
    process.exit = vi.fn(() => {
      throw new Error("process.exit called");
    });
    console.error = vi.fn();
  });

  afterEach(() => {
    process.env.VITE_SITE_URL = originalEnv;
    process.exit = originalExit;
    console.error = originalError;
  });

  it("exits with error when VITE_SITE_URL is not set", async () => {
    delete process.env.VITE_SITE_URL;

    // We need to test the main script's behavior
    // Since it calls process.exit(1), we'll verify the error message
    const { generate } = await import("../generate-sitemap.mjs");

    await expect(generate()).rejects.toThrow("process.exit called");
    expect(console.error).toHaveBeenCalledWith("ERROR: VITE_SITE_URL environment variable is required");
  });

  it("exits with error when VITE_SITE_URL is invalid", async () => {
    process.env.VITE_SITE_URL = "not-a-valid-url";

    const { generate } = await import("../generate-sitemap.mjs");

    await expect(generate()).rejects.toThrow("process.exit called");
    expect(console.error).toHaveBeenCalledWith(
      'ERROR: VITE_SITE_URL must be a valid URL (got: "not-a-valid-url")'
    );
  });

  it("exits with error when VITE_SITE_URL has invalid protocol", async () => {
    process.env.VITE_SITE_URL = "ftp://example.com";

    const { generate } = await import("../generate-sitemap.mjs");

    await expect(generate()).rejects.toThrow("process.exit called");
    expect(console.error).toHaveBeenCalledWith(
      'ERROR: VITE_SITE_URL must be a valid URL (got: "ftp://example.com")'
    );
  });
});