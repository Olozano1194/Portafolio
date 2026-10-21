# Delta for tier1-pure-logic-tests

Source: proposal.md → Scope §3; Key Decisions: pure logic first (highest defect-detection per effort). No existing main spec — all requirements ADDED.

## ADDED Requirements

### Requirement: R1 — Routing param helpers covered

`getParam`, `getParamAsNumber`, and `getParamOptional` in `types/routing.ts` MUST have unit tests covering valid input, invalid input, and absent input.

#### Scenario: valid numeric id

- GIVEN query params contain `id=42`
- WHEN `getParamAsNumber('id')` is called
- THEN it returns the number 42

#### Scenario: non-numeric id falls back

- GIVEN query params contain `id=abc`
- WHEN `getParamAsNumber('id', fallback)` is called
- THEN it returns the fallback, not NaN

#### Scenario: absent optional param

- GIVEN an optional param is absent from the query string
- WHEN `getParamOptional` is called
- THEN it returns its documented default without throwing

### Requirement: R2 — Type guards covered

The type guards in `types/demo.ts` and `types/proyecto.ts` MUST have tests proving acceptance of valid shapes and rejection of malformed input.

#### Scenario: valid payload accepted

- GIVEN a well-formed demo/proyecto object
- WHEN the guard is called
- THEN it returns true

#### Scenario: malformed payload rejected

- GIVEN an object missing required fields or carrying wrong value types
- WHEN the guard is called
- THEN it returns false

### Requirement: R3 — `skillLevelLabel` covered

`skillLevelLabel` in `types/skill.ts` MUST map every valid skill level to its display label and return a defined fallback for unknown input.

#### Scenario: every level mapped

- GIVEN each valid skill level
- WHEN `skillLevelLabel` is called
- THEN it returns the corresponding non-empty label

#### Scenario: unknown level falls back

- GIVEN an out-of-range or unknown level value
- WHEN the function is called
- THEN it returns a defined fallback label without throwing

### Requirement: R4 — `scrollToSection` covered

`utils/scrollToSection.ts` MUST be tested for the happy path (target exists → scroll invoked) and the missing-target path (no-op, no throw).

#### Scenario: target section exists

- GIVEN a DOM element with the target id is mounted
- WHEN `scrollToSection(id)` is called
- THEN the scroll API is invoked toward that element

#### Scenario: target missing

- GIVEN no element matches the id
- WHEN `scrollToSection(id)` is called
- THEN nothing throws and no scroll is performed

### Requirement: R5 — `useTheme` covered

`hooks/useTheme` MUST be tested for initial state resolution, toggle behavior, and persistence.

#### Scenario: toggle flips and persists

- GIVEN the current theme is light
- WHEN the user toggles the theme
- THEN the theme state flips, the document reflects it, and the new value is written to localStorage

#### Scenario: persisted value restored on load

- GIVEN localStorage holds a saved dark-theme value
- WHEN the hook initializes
- THEN the initial state is dark, not the default
