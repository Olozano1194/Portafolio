# Proposal: Skills Seniority Badges

## Intent

Add colored seniority badges (Junior/Mid) to each hard skill card so recruiters can instantly assess proficiency levels at a glance.

## Scope

### In Scope
- Add `level` field (mid/junior) to all 11 existing skills in skillSoftHobb.js
- Add Express and MongoDB as Junior skills
- Update HardSkillsSection.jsx to render colored seniority badges next to each skill name
- Style badges with Tailwind: Mid = bg-primary/20 text-primary, Junior = bg-surface-alt text-on-surface-variant

### Out of Scope
- Translation keys (Junior/Mid are universal English terms)
- Changes to SoftSkillsSection or soft skills data
- Percentage-based proficiency indicators

## Approach

Pure additive changes to existing files:
1. Edit src/data/skillSoftHobb.js: add level field + 2 new entries
2. Edit src/components/sections/hardSoftSkills/HardSkillsSection.jsx: render conditional badge span

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| src/data/skillSoftHobb.js | Modified | Add level field to all skills, add Express + MongoDB |
| src/components/sections/hardSoftSkills/HardSkillsSection.jsx | Modified | Render colored seniority badge next to skill name |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Card layout disruption | Low | Badge is inline span, no structural change |
| Padding imbalance with new skills | Low | 13 items still fit 2-col grid |

## Rollback Plan

Revert skillSoftHobb.js and HardSkillsSection.jsx. No migrations, no breaking changes.

## Success Criteria

- [ ] Each hard skill card shows a colored seniority badge
- [ ] Mid skills (HTML5, CSS3) show badge in primary/accent color
- [ ] Junior skills show badge in neutral/gray color
- [ ] All 13 skills render correctly
- [ ] Build passes with no errors
