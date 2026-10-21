# Delta for coverage-tooling

Source: proposal.md → Scope §2; Key Decisions: coverage thresholds = Option 1 now (report only), Option 3 (ratchet) later. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Coverage provider installed and lockfile committed

The project MUST have `@vitest/coverage-v8` as a devDependency, with `package-lock.json` updated and committed so `npm ci` succeeds on a clean checkout.

#### Scenario: clean install works

- GIVEN a fresh clone of the repository
- WHEN `npm ci` runs
- THEN it completes without lockfile mismatch errors
- AND `npm ls @vitest/coverage-v8` reports the installed package

### Requirement: R2 — `test:coverage` script

`package.json` MUST define a `test:coverage` script that runs the Vitest suite with the v8 coverage provider and emits a report.

#### Scenario: coverage report produced

- GIVEN the test suite passes
- WHEN `npm run test:coverage` runs
- THEN a coverage summary (statements, branches, functions, lines) is printed for `src/`

### Requirement: R3 — Coverage excludes noise

Coverage reporting MUST exclude non-executable or data-only paths: `src/data/**`, `src/types/**`, `src/locales/**`, `src/main.tsx`, `src/i18n.ts`, `**/*.d.ts`, and `**/__tests__/**`.

#### Scenario: excludes applied

- GIVEN coverage runs over the repository
- WHEN the report is generated
- THEN excluded paths contribute no uncovered-file noise to the summary

### Requirement: R4 — Report-only, no CI gate

Coverage MUST NOT enforce thresholds in this change; it is report-only. Threshold ratcheting (starting with a modest ~40–50% statements floor) is explicitly deferred to a later change per the proposal decision table.

#### Scenario: low coverage does not fail

- GIVEN coverage is well below any future floor
- WHEN `npm run test:coverage` runs locally or in CI
- THEN the command exits 0 as long as all tests pass
