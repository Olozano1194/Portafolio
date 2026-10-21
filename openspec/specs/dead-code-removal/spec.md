# Delta for dead-code-removal

Source: proposal.md → Key Decisions: `LanguageSwitcher` = Option 2 (delete it — Header has an inline toggle), chosen over testing it (Option 1) or excluding it from coverage (Option 3). No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Remove LanguageSwitcher

The unused `LanguageSwitcher` component MUST be deleted from the codebase. The Header's inline language toggle is the supported mechanism and MUST NOT regress.

#### Scenario: component deleted

- GIVEN the change is applied
- WHEN the source tree is searched for `LanguageSwitcher`
- THEN no component file, import, or export reference remains

#### Scenario: no functional regression

- GIVEN `LanguageSwitcher` is removed
- WHEN the Header language toggle is exercised (per the tier2 Header tests)
- THEN language switching still works end to end

### Requirement: R2 — No bespoke coverage exclusion for dead code

Since the dead code is deleted rather than excluded, the coverage configuration MUST NOT carry a `LanguageSwitcher`-specific exclusion; the generic excludes defined in the coverage-tooling spec apply unchanged.

#### Scenario: no special-case exclude

- GIVEN coverage configuration is reviewed
- WHEN the exclude list is inspected
- THEN no entry singles out `LanguageSwitcher`
