# Delta for locales-seo-keys

Source: proposal.md → Scope §`src/locales/*/translation.json` (add JSON-LD schema strings if JSON-LD text is localized; current `seo.*` keys: `siteName`, `home`, `error404`); Tests §`i18n-parity.test.ts` must stay green. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Parity for any new JSON-LD keys

If JSON-LD text is localized, every new key MUST be added to BOTH `src/locales/es/translation.json` and `src/locales/en/translation.json` at the identical dot-path, so i18n parity is preserved.

#### Scenario: new key added in both locales

- GIVEN a new `seo.*` key is introduced for JSON-LD text
- WHEN both locale files are written
- THEN the key exists at the same dot-path in `es` and `en`

#### Scenario: parity test catches a one-sided addition

- GIVEN the key is added only to `es`
- WHEN `i18n-parity.test.ts` runs
- THEN it fails and names the missing `en` key path

### Requirement: R2 — Existing seo keys preserved

Existing `seo.siteName`, `seo.home.title`, `seo.home.description`, `seo.error404.title`, and `seo.error404.description` MUST remain unchanged and continue to be consumed by the SEO component.

#### Scenario: site name still drives titles

- GIVEN `seo.siteName` is unchanged
- WHEN `SEO` renders a page with an explicit title
- THEN the document title resolves to `{title} | {siteName}`

### Requirement: R3 — Localized JSON-LD is optional

JSON-LD human-readable text (e.g. `jobTitle`, description strings) MAY be localized; when it is not, the static Spanish values in `index.html` remain authoritative for the default language.

#### Scenario: no new keys required

- GIVEN JSON-LD uses only static non-localized strings
- WHEN the locales are written
- THEN no keys are added and parity tests still pass

#### Scenario: localized keys drive JSON-LD text

- GIVEN a localized JSON-LD key exists in both locales
- WHEN the active language is `en`
- THEN the injected JSON-LD uses the `en` value
