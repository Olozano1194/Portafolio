# Spec: Skills Seniority Badges

## Requirements

### R1: Seniority level per skill
Each skill MUST have a `level` field with value `"mid"` or `"junior"`.

- **Mid**: HTML5, CSS3
- **Junior**: JavaScript, TypeScript, React, Tailwind, Django, Python, Java, MySQL, Git, Express, MongoDB

#### Scenario: 13 skills with correct levels
- GIVEN the skillSoftHobb.js data
- WHEN HardSkillsSection processes the data
- THEN HTML5 and CSS3 have level "mid"
- AND all other skills have level "junior"

### R2: Express and MongoDB added as new skills
Express and MongoDB MUST be added as new entries in the skills data with `level: "junior"`.

#### Scenario: New skills present
- GIVEN the skillSoftHobb.js data
- THEN Express and MongoDB exist in the array
- AND both have level "junior"

### R3: Colored seniority badge
Each skill card MUST display a colored `<span>` badge with seniority level text, positioned next to the skill name.
- Mid badge: `bg-primary/20 text-primary` with rounded corners and small padding
- Junior badge: `bg-surface-alt text-on-surface-variant` with rounded corners and small padding
- Badge MUST display "Mid" or "Junior" text in English

#### Scenario: Mid badge renders
- GIVEN a skill with level "mid"
- WHEN the card renders
- THEN a span shows "Mid" with primary-color styling

#### Scenario: Junior badge renders
- GIVEN a skill with level "junior"
- WHEN the card renders
- THEN a span shows "Junior" with neutral/gray styling

### R4: Badge text in English
Badge text MUST display "Junior" and "Mid" directly — no translation key lookups. These terms are universal in tech recruiting.

#### Scenario: No translation keys used
- GIVEN the badge component
- WHEN it renders the level text
- THEN the text is a hardcoded string, not an i18n key
