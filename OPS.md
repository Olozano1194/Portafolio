# Operations Guide

This document covers environment variable setup for local development and Vercel deployment.

---

## `VITE_SITE_URL` Configuration

The build requires `VITE_SITE_URL` to be set. It is used by:

1. **Prebuild script** (`scripts/generate-sitemap.mjs`) - generates `public/sitemap.xml` and `public/robots.txt`
2. **Vite build** - replaces `%VITE_SITE_URL%` placeholder in `index.html`
3. **SEO component** - constructs canonical URLs and structured data

**The build fails fast with a clear error if `VITE_SITE_URL` is not set or invalid.**

---

### Local Development

#### Option 1: `.env` file (recommended)
```bash
# .env (at project root)
VITE_SITE_URL=https://oscarlozano.dev
```

#### Option 2: Shell export (one-off)
```bash
# PowerShell
$env:VITE_SITE_URL="https://oscarlozano.dev"
npm run build

# Bash/Zsh
VITE_SITE_URL=https://oscarlozano.dev npm run build
```

#### Option 3: `.env.local` (git-ignored, for local overrides)
```bash
# .env.local
VITE_SITE_URL=https://localhost:5173
```

> **Note:** For local `npm run dev`, the dev server works without `VITE_SITE_URL` (the SEO component falls back to relative URLs). Only `npm run build` requires it.

---

### Vercel Deployment

#### Project Settings → Environment Variables

Add `VITE_SITE_URL` for **both** environments:

| Environment | Value | Notes |
|-------------|-------|-------|
| **Production** | `https://oscarlozano.dev` | Your custom domain |
| **Preview** | `https://oscarlozano.dev` | Or use Vercel's auto-generated preview URL pattern |

#### Automatic Preview URL (Alternative)

For preview deployments, you can use Vercel's system variable:
```
VITE_SITE_URL=https://$VERCEL_URL
```
This makes each preview deployment self-referential.

---

### Why Hard-Fail?

The build intentionally fails without `VITE_SITE_URL` because:

1. **Canonical URLs must be absolute** - Relative canonicals are invalid per SEO best practices
2. **Sitemap/robots.txt require absolute URLs** - Search engines require absolute URLs in sitemaps
3. **Structured data requires absolute URLs** - Schema.org Person/WebSite must have absolute URLs
4. **Silent failures are worse** - Building without it produces broken SEO artifacts

---

### Validation Rules

The build validates `VITE_SITE_URL`:
- Must be set (non-empty)
- Must be a valid URL (`http:` or `https:` protocol)
- Trailing slashes are normalized

Invalid examples that will fail:
```bash
VITE_SITE_URL=              # Empty
VITE_SITE_URL=not-a-url     # Invalid format
VITE_SITE_URL=ftp://site.com # Wrong protocol
```

---

### Related Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Runs `prebuild` automatically, then `vite build` |
| `npm run prebuild` | Generates `public/sitemap.xml` + `public/robots.txt` |
| `node scripts/generate-sitemap.mjs` | Manual generation (requires `VITE_SITE_URL`) |

---

### Troubleshooting

| Issue | Solution |
|-------|----------|
| `ERROR: VITE_SITE_URL environment variable is required` | Set the variable per above |
| `ERROR: VITE_SITE_URL must be a valid URL` | Use `https://` or `http://` prefix |
| Sitemap not in `dist/` | Ensure `prebuild` ran (runs automatically with `npm run build`) |
| Preview deployment has wrong canonical | Set `VITE_SITE_URL=https://$VERCEL_URL` for Preview env |