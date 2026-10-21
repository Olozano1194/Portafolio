# Delta for ci-test-step

Source: proposal.md → Scope §6; Key Decisions: CI = Option 1 (extend existing workflow, rename to `ci.yml`); Risks: Node version pin, lockfile freshness. No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Single CI workflow named `ci.yml`

The existing `.github/workflows/typecheck.yml` MUST be renamed to `.github/workflows/ci.yml` (one workflow, not a parallel test workflow), preserving the push and pull_request triggers and the existing typecheck and lint steps.

#### Scenario: workflow renamed, existing gate intact

- GIVEN the change is applied
- WHEN `.github/workflows/` is inspected
- THEN `ci.yml` exists and `typecheck.yml` does not
- AND the workflow still runs typecheck and lint on push and pull_request

### Requirement: R2 — Test step in CI

CI MUST run `npm run test` after typecheck/lint so a failing suite blocks the PR.

#### Scenario: failing test blocks the PR

- GIVEN a PR introduces a failing test
- WHEN the workflow runs
- THEN the workflow fails at the test step

#### Scenario: green suite proceeds

- GIVEN all tests pass
- WHEN the workflow runs
- THEN the test step succeeds and subsequent steps run

### Requirement: R3 — Build step in CI

CI MUST run `npm run build` to match the quality gate established by the contact-form specs (typecheck + lint + test + build).

#### Scenario: build regression caught

- GIVEN a change breaks the production build
- WHEN the workflow runs
- THEN the build step fails and the workflow is red

### Requirement: R4 — Pinned Node version

The workflow MUST pin `node-version: '22'` (Vite 8 requires Node ≥ 20.19 / 22.12; floating majors risk surprise breakage as noted in the proposal risks table).

#### Scenario: supported Node used

- GIVEN the workflow runs on ubuntu-latest
- WHEN setup-node executes
- THEN Node 22.x is installed and `npm ci` succeeds against the committed lockfile
