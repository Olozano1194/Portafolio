## Exploration: Add Proficiency Levels to Hard Skills Cards

### Current State

- **HardSkillsSection** renders tech skill cards in a 2-column grid (`grid-cols-2 gap-4`).
- Each card is a flex row: icon (left) + translated name (right), with `p-6` padding.
- Cards have hover effects: lift (`-translate-y-1`), shadow, icon scale + rotate.
- Data comes from `src/data/skillSoftHobb.js` → `skill` array with only `{ id, icon }` — **no level property**.
- Translations: `skills.items.{id}.description` in both ES/EN translation files.
- **No tests exist** for HardSkillsSection or SkillsSection.

- **SoftSkillsSection** (adjacent, right column) already has progress bars with percentage labels — establishes the design language for level display.

### Affected Areas

- `src/data/skillSoftHobb.js` — must add `level` (0–100 number) to each skill object
- `src/components/sections/hardSoftSkills/HardSkillsSection.jsx` — must render the level indicator
- `src/locales/es/translation.json` — MAY need level labels if using badge-based approach
- `src/locales/en/translation.json` — MAY need level labels if using badge-based approach
- `src/components/sections/__tests__/` — should add new tests for the updated component
- `src/components/sections/SkillsSection.jsx` — unlikely to change (layout stays same)

### Approaches

#### 1. Progress Bar Inside Each Card (recommended)

Add a thin progress bar at the bottom of each hard skill card, reusing the same visual language as SoftSkillsSection.

```
┌────────────────────┐
│  [icon]  HTML5     │
│  ████████░░ 80%    │
└────────────────────┘
```

- **Pros:**
  - Visually consistent with the adjacent SoftSkillsSection (same bar style, same `h-1` track)
  - Immediately scannable for recruiters — no interpretation needed
  - Reuses existing Tailwind classes and patterns from SoftSkillsSection
  - Simple implementation: add a percentage, render a thin bar below the text
- **Cons:**
  - Cards get ~20px taller (may need layout adjustment)
  - Could visually compete with soft skills if both sections look too identical
- **Effort:** Low

#### 2. Star/Dot Rating System

Show 1–5 filled/unfilled dots or stars below each skill name.

```
┌────────────────────┐
│  [icon]  HTML5     │
│  ★★★★☆            │
└────────────────────┘
```

- **Pros:**
  - Compact — adds minimal height to cards
  - Visually distinct from soft skills progress bars (avoids repetition)
  - Recruiter-friendly: instantly recognizable rating pattern
  - No translation needed if labels are omitted
- **Cons:**
  - Less precise than percentage (only 5 buckets vs 0–100 scale)
  - Different visual language than the adjacent soft skills section
  - Need to map percentage to star count (adds abstraction layer)
  - Might require custom SVG or Unicode handling for consistent rendering
- **Effort:** Low

#### 3. Badge-Based Levels (Beginner → Expert)

Show a colored text badge or chip below the skill name (e.g., "Advanced", "Avanzado").

```
┌────────────────────┐
│  [icon]  HTML5     │
│  [Advanced]        │
└────────────────────┘
```

- **Pros:**
  - Professional look — common in resume/portfolio contexts
  - Good scannability with color coding
  - Easy to localize via i18n keys
- **Cons:**
  - Requires translation keys for both ES and EN (5 level labels × 2 languages)
  - Less granular than percentage (only 4–5 buckets)
  - Cards vary in width based on label length (harder to align in grid)
  - Color semantics need careful accessibility consideration
  - Adds more complexity than other approaches
- **Effort:** Medium

#### 4. Simple Percentage Text

Show just the percentage number as text overlay, no bar/dots.

```
┌────────────────────┐
│  [icon]  HTML5     │
│  80%               │
└────────────────────┘
```

- **Pros:**
  - Minimal visual change — barely increases card height
  - Zero new CSS, zero translation keys
  - Most precise (exact 0–100)
- **Cons:**
  - Least scannable — numbers require reading + interpretation
  - Feels incomplete compared to the visual bars in soft skills
  - No visual anchor — easy to miss when scanning
- **Effort:** Trivial

### Recommendation

**Go with Approach 1: Progress Bar Inside Each Card.**

Rationale:
1. **Visual consistency** — the adjacent SoftSkillsSection already uses `h-1` progress bars with `bg-surface-alt` tracks and `bg-primary` fills. Reusing this pattern creates a cohesive visual language across both subsections.
2. **Recruiter experience** — progress bars are the most scannable format for comparing proficiency at a glance. A recruiter can process the entire grid in under 2 seconds.
3. **Implementation simplicity** — the approach requires only:
   - Adding `level` (number 0–100) to each skill in the data file
   - Adding a thin bar div below the skill name in the card
   - Keeping the same bar styling as SoftSkillsSection
4. **Zero translation overhead** — display the number directly, no i18n keys needed.

Implementation sketch for the card:
```jsx
<article className="group relative bg-surface-container flex flex-col p-6 rounded-xl gap-3 transition-all duration-300 ease-out
  hover:bg-surface-alt hover:-translate-y-1 hover:shadow-lg">
  <div className="flex items-center gap-4">
    <span className="text-primary text-xl ...">{Icon && <Icon />}</span>
    <span className="font-label text-sm text-on-surface tracking-wide ...">
      {t(`skills.items.${item.id}.description`)}
    </span>
  </div>
  <div className="bg-surface-alt h-1 overflow-hidden rounded-full w-full mt-1">
    <div className="bg-primary h-full transition-all" style={{ width: `${item.level}%` }} />
  </div>
</article>
```

Key design decisions:
- Switch card from `flex-row` to `flex-col` to allow the bar to sit below the icon+name row
- Keep `items-center` behavior for the inner flex row (icon + name)
- Bar is `h-1` with `rounded-full`, matching SoftSkillsSection exactly
- Add subtle transition to bar fill width for a nice entrance effect

### Risks

- **Card height increase** — switching to `flex-col` with a bar adds ~24px per card. In a 2-column grid with 11 skills (6 rows), this may shift the bottom cards below the fold. Mitigation: the grid is inside a `gap-24 lg:grid-cols-2` parent, so there's room.
- **Mobile responsiveness** — on smaller screens, the grid may go to 1 column depending on Tailwind breakpoints. The progress bar should render fine regardless. Verify at `xs` and `sm` breakpoints.
- **Percentage accuracy** — the user (Oscar) needs to self-assess realistic levels for each skill. This is a data integrity risk: over-inflated or arbitrary numbers hurt credibility with recruiters.
- **No existing tests** — currently no test coverage for SkillsSection. Should add basic render + level presence tests as part of implementation.

### Ready for Proposal

**Yes.** The path is clear. The orchestrator should tell the user:
- The recommended approach (progress bars, consistent with soft skills)
- That we'll need Oscar to provide realistic percentage values for each of the 11 skills
- That no translation work is needed
- The estimated effort is low and can be done in a single implementation pass
