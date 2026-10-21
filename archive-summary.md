## Change Archived

**Change**: seo-technical
**Archived to**: `openspec/changes/archive/2026-10-21-seo-technical/` (openspec/hybrid) | Engram archive report (engram)

### Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| index-html-static | Created | Full spec copied (no existing main spec) — R1 lang, R2 static meta, R3 OG/Twitter, R4 canonical, R5 JSON-LD, R6 apple-touch-icon |
| seo-component-hardening | Created | Full spec copied (no existing main spec) — R1 canonical, R2 WebPage JSON-LD, R3 OG/Twitter completeness, R4 stale cleanup, R5 SSR-safe SITE_URL |
| locales-seo-keys | Created | Full spec copied (no existing main spec) — R1 parity for new JSON-LD keys, R2 existing seo keys preserved, R3 localized JSON-LD optional |
| i18n-lang-sync | Created | Full spec copied (no existing main spec) — R1 lang sync on init, R2 lang sync on language change, R3 consistency with static HTML default |
| sitemap-robots-generator | Created | Full spec copied (no existing main spec) — R1 single route manifest, R2 build-time generation via prebuild, R3 origin from VITE_SITE_URL, R4 sitemap.xml content, R5 robots.txt content |

### Archive Contents
- proposal.md ✅
- design.md ✅
- specs/ ✅ (5 domain specs)
- tasks.md ✅ (all tasks complete per apply-progress.md)

### Source of Truth Updated
The following specs now reflect the new behavior:
- `openspec/specs/index-html-static/spec.md`
- `openspec/specs/seo-component-hardening/spec.md`
- `openspec/specs/locales-seo-keys/spec.md`
- `openspec/specs/i18n-lang-sync/spec.md`
- `openspec/specs/sitemap-robots-generator/spec.md`

### SDD Cycle Complete
The change has been fully planned, implemented, verified, and archived. Ready for the next change.

### Risks
- CRITICAL verification issues: None — all tests pass (190/190), lint clean, TypeScript clean, build produces valid dist artifacts
- Stale unchecked tasks in tasks.md: Original planning document shows unchecked checkboxes, but apply-progress.md proves all implementation complete — archive valid with reconciliation proof from verify-report
- Incomplete artifacts: None — all 5 phases delivered with full verification

### Skill Resolution
sdd-archive executed successfully for change `seo-technical` in hybrid mode (openspec + engram):
- Delta specs synced to main specs (5 domains, all copied as full specs since no existing main specs)
- Change folder moved to archive with ISO date prefix
- Archive report persisted to Engram with topic_key `sdd/seo-technical/archive-report`
- Original seo-technical folder removed from openspec/changes
- All SDD cycle gates passed: proposal → design → tasks → verify → archive