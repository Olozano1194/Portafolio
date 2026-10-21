# Delta for i18n-parity-test

Source: proposal.md → Scope §5; Risks: i18n mock drift — exploration confirmed the ES/EN email-pattern string mismatch that this guard would have caught. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — ES/EN key-set equality

A test MUST assert that `src/locales/es/translation.json` and `src/locales/en/translation.json` contain exactly the same set of keys at every nesting level.

#### Scenario: parity holds

- GIVEN both locale files have identical key structure
- WHEN the parity test runs
- THEN it passes

#### Scenario: key missing in EN

- GIVEN a key exists in ES but was removed from EN
- WHEN the parity test runs
- THEN it fails and names the missing key path

#### Scenario: extra key in EN

- GIVEN EN contains a key that ES lacks
- WHEN the parity test runs
- THEN it fails and names the extra key path

### Requirement: R2 — Actionable failure output

The parity test MUST fail with a message listing the exact dot-path of every differing key, so drift is fixable without manual diffing of the locale files.

#### Scenario: nested drift is diagnosable

- GIVEN a drift inside a nested section (e.g. `contact.form.errors.*`)
- WHEN the test fails
- THEN the output includes the full dot-path of each differing key

### Non-functional

- Scope is key-set parity only; string-value differences between locales are intentionally out of scope (proposal decision).
