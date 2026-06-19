# Design: Skills Seniority Badges

## Technical Approach

Two-file change: data source + component render. Zero translation impact.

## Data Changes

### skillSoftHobb.js
Add `level: "mid" | "junior"` to each existing skill object. Add two new entries.

**New data structure:**
```js
export const skill = [
    { id: 1,  icon: "FaHtml5",        level: "mid" },
    { id: 2,  icon: "FaJava",          level: "junior" },
    { id: 3,  icon: "FaCss3",         level: "mid" },
    { id: 4,  icon: "FaPython",       level: "junior" },
    { id: 5,  icon: "IoLogoJavascript", level: "junior" },
    { id: 6,  icon: "SiDjango",       level: "junior" },
    { id: 7,  icon: "FaReact",        level: "junior" },
    { id: 8,  icon: "SiTailwindcss",  level: "junior" },
    { id: 9,  icon: "SiMysql",        level: "junior" },
    { id: 10, icon: "FaGitAlt",       level: "junior" },
    { id: 11, icon: "SiTypescript",   level: "junior" },
    { id: 12, icon: "SiExpress",      level: "junior" },
    { id: 13, icon: "SiMongodb",      level: "junior" },
]
```

Express icon: `SiExpress` from `react-icons/si`
MongoDB icon: `SiMongodb` from `react-icons/si`

## Component Changes

### HardSkillsSection.jsx
Add badge span after the skill name span inside each card:

```jsx
<span className="font-label text-sm text-on-surface tracking-wide transition-colors group-hover:text-primary">
  {t(`skills.items.${item.id}.description`)}
</span>
{item.level && (
  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
    item.level === 'mid' 
      ? 'bg-primary/20 text-primary' 
      : 'bg-surface-alt text-on-surface-variant'
  }`}>
    {item.level === 'mid' ? 'Mid' : 'Junior'}
  </span>
)}
```

The badge uses Tailwind:
- `ml-2`: spacing from skill name
- `px-2 py-0.5`: compact padding
- `rounded-full`: pill shape
- `text-xs`: smaller than skill name
- `font-semibold`: readable weight
- Conditional colors: mid = primary, junior = neutral

## File Changes Summary

| File | Action | Details |
|------|--------|---------|
| src/data/skillSoftHobb.js | Modify | Add level field to all skills, add Express + MongoDB entries |
| src/components/sections/hardSoftSkills/HardSkillsSection.jsx | Modify | Add conditional badge span after skill name |

## Verification

1. Run dev server: each skill card shows badge
2. HTML5 and CSS3 show "Mid" in primary color
3. All other 11 skills show "Junior" in neutral gray
4. `npm run build` passes without errors
