# Delta for i18n-lang-sync

Source: proposal.md → Scope §`src/i18n.ts`; Approach §3 Language Sync; Risk §`index.html` lang vs i18n default mismatch (current bug); Acceptance Criteria 3. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Lang sync on initialization

`src/i18n.ts` MUST set `document.documentElement.lang` to the active `i18n.language` immediately after initialization, so the document language matches the app from first paint onward.

#### Scenario: init sets the default language

- GIVEN i18n initializes with active language `es`
- WHEN `init` completes
- THEN `document.documentElement.lang === 'es'`

#### Scenario: init corrects a stale static value

- GIVEN served HTML declares `lang="es"` but the active i18n language is `en`
- WHEN `init` completes
- THEN `document.documentElement.lang === 'en'`

### Requirement: R2 — Lang sync on language change

`src/i18n.ts` MUST subscribe to the `languageChanged` event and update `document.documentElement.lang` on every change, keeping the DOM in sync without a page reload.

#### Scenario: runtime switch updates the document

- GIVEN the document lang is `es`
- WHEN the user switches language to `en`
- THEN `document.documentElement.lang` becomes `en`

#### Scenario: rapid switches settle on the last value

- GIVEN the user switches es → en → es quickly
- WHEN all events fire
- THEN the attribute equals the final active language `es`

### Requirement: R3 — Consistency with the static HTML default

The static `lang="es"` in `index.html` and the runtime-synced value MUST agree under default conditions, so no attribute change occurs between first paint and hydration.

#### Scenario: no post-hydration flicker

- GIVEN the default language is `es`
- WHEN the app hydrates and `i18n.ts` runs
- THEN the `lang` attribute is `es` both before and after initialization

#### Scenario: parity test stays green

- GIVEN `i18n-parity.test.ts` exists
- WHEN the language-sync code is added
- THEN all existing i18n tests still pass (proposal Scope §Tests)
