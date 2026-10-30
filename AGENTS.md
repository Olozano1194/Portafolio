# AGENTS.md — Portafolio

Contract for every agent (and human) working in this repository.

Global rules in `~/.config/opencode/AGENTS.md` still apply. On conflict, **this file wins** for repo-specific behavior.

Read this before planning, before writing code, and before every commit.

---

## 1. Iron rules

### R1 — No commit without explicit approval

Never run `git commit` until the human approves in the current conversation.

*Explicit* means: you showed the change (files, line counts, verification output) and the human said yes.
Silence, a previous approval, "it's obvious", or "just finish it" are **not** approval.

Runtime gate: `opencode.json` sets `git commit *` to `ask`, so the tool asks the human before it runs.

### R2 — No push without explicit approval

Same gate for `git push`, `git push --force`, tags, and PRs.

Approving a commit **never** approves a push. They are separate decisions, every time.

### R3 — Commits in Spanish, Conventional Commits format

```
<type>(<scope>): <descripción en español>

<cuerpo opcional, en español>

<footer opcional>
```

| Type | Use for |
| --- | --- |
| `feat` | New user-visible behavior |
| `fix` | Bug fix |
| `refactor` | Behavior unchanged, structure improved |
| `test` | Tests only |
| `docs` | Docs only |
| `perf` | Measured performance gain |
| `style` | Formatting only |
| `build` | Build system, deps |
| `ci` | CI config |
| `chore` | Tooling, housekeeping |
| `revert` | Reverts a previous commit |

Rules:

- Header ≤ 72 chars, no trailing period, lowercase after the colon.
- Scope is optional, lowercase: `seo`, `contacto`, `i18n`, `sdd`, `tooling`.
- The description is Spanish. The code, identifiers, and UI copy stay English.
- No AI attribution of any kind (`Co-Authored-By`, "Generated with", etc.).
- One commit = one work unit. Never bundle an unrelated fix.

Examples:

```
feat(seo): agregar canonical por ruta
fix(contacto): corregir validación de email vacío
refactor(utils): extraer cálculo de scroll a función pura
chore(tooling): agregar hook de tamaño de archivo
```

Enforced by `.githooks/commit-msg` → `scripts/check-commit-msg.mjs`.

---

### R7 — No direct push to main or master

Never push directly to `main` or `master`, even with approval. Those branches move only through a pull request.

- `git push origin main`, `git push origin HEAD:main`, and force-push variants are blocked by `.githooks/pre-push`.
- Emergency override: `GENTLE_ALLOW_MAIN_PUSH=1 git push ...` — only with explicit human approval, and the reason must be recorded in the PR.
- CI runs on both `push` and `pull_request` (`.github/workflows/ci.yml`); a direct push bypasses review.

---

## 2. R4 — 250-line file cap

**No source file may exceed 250 lines, tests included.**

- Applies to `.ts .tsx .js .jsx .mjs .cjs .css` under `src/`, `scripts/`, and root config files.
- Exempt: `*.md`, `src/locales/**/*.json` (translation catalogs are data), generated output, `package-lock.json`.
- The cap is a design signal, not a formatting rule. Hitting it means the file has more than one job.

When a change would exceed the cap, extract **before** adding:

1. Pure logic → `src/utils/`
2. UI piece → `src/components/ui/`
3. Stateful logic → `src/hooks/`
4. Types → `src/types/`

If it still does not fit, the change is too big: split it into two SDD changes. **Never raise the cap, never grandfather "just this once".**

Enforced by `.githooks/pre-commit` → `scripts/check-file-size.mjs`.

---

## 3. R5 — Junior-first code

The code must be readable, explainable, and modifiable by a junior developer without a guide.

**Do**

- One job per file and per function. Names read like sentences (`getVisibleProjects`, not `proc`).
- Max 3 levels of nesting. Early returns over `else`.
- Functions ≤ 40 lines. Exported APIs get explicit types; locals rely on inference.
- Comments explain *why*, not *what*.
- Errors reach the user through the existing toast + i18n path.

**Don't**

- No conditional, mapped, or template-literal type gymnastics. The `typescript-advanced-types` skill is for **reading** existing types, never for writing new ones.
- No abstraction with a single caller (rule of three).
- No custom hook that only wraps one `useState`.
- No `useMemo`/`useCallback` without a measured reason.
- No new dependency for something 30 lines solve.
- No barrel files that hide the real import graph.
- No `any`, no `!` to silence the compiler, no `@ts-ignore`.
- No classes, DI containers, or state libraries.

**Test:** a junior can read the file top to bottom and change one behavior without asking. If not, simplify or document.

---

## 4. R6 — SDD works with the project skills

### Where artifacts live

| Artifact | Path | Tracked |
| --- | --- | --- |
| Proposal, design, tasks, apply progress | `openspec/changes/<change-id>/` | yes |
| Capability spec | `openspec/specs/<capability>/spec.md` | yes |
| Archived change | `openspec/changes/archive/<date>-<change-id>/` | yes |
| Exploration scratch | `sdd/<change-id>/exploration.md` | no (gitignored) |

A decision that only exists in `sdd/` does not exist. Promote it to `openspec/` or it will be lost.

### Skill loading is mandatory

Before starting any phase: read `.atl/skill-registry.md`, load the mapped `SKILL.md` files below, then work.
Regenerate the registry with `gentle-ai skill-registry refresh --force` if a skill is missing.

| Phase | Load |
| --- | --- |
| `sdd-explore` | `react-best-practices` (only when UI context matters) |
| `sdd-propose` | `cognitive-doc-design` |
| `sdd-design` | `frontend-design`, `composition-patterns`, `tailwind-css-patterns`, plus `accessibility` and `seo` when those areas are touched |
| `sdd-tasks` | `work-unit-commits`, `chained-pr` |
| `sdd-apply` | `react-best-practices`, `vitest`, `tailwind-css-patterns`, plus `react-hook-form` for forms |
| `sdd-verify` | `vitest`, `accessibility`, `seo` |
| `sdd-archive` | `cognitive-doc-design` |

Skip a skill only when its trigger genuinely does not match, and say why.
Every artifact ends with:

```
Skill Resolution: <paths-injected | none> — <reason>
```

### Phase gates

- `propose` and `design` end with a human decision. Do not chain into the next phase on your own.
- `apply` starts only with an approved `tasks.md`.
- `verify` must run the real commands, not reason about them.
- If `tasks.md` grows past ~10 work units, split the change.

### Orchestration

The orchestrator dispatches and never implements. Each subagent receives the exact `SKILL.md` paths to load — never a summary of them.

---

## 5. Architecture boundaries

| Folder | Holds |
| --- | --- |
| `src/pages/` | Route composition |
| `src/layouts/` | Page shells |
| `src/components/sections/` | Domain UI (contacto, demos, videos) |
| `src/components/ui/` | Reusable primitives |
| `src/hooks/` | Stateful reusable logic |
| `src/utils/` | Pure functions, no React imports |
| `src/data/` | Static content |
| `src/types/` | Types |
| `src/locales/` | Copy, `es` and `en` in sync |

- Business logic goes in `src/utils/` as pure functions so it is testable without a browser.
- No new top-level folders without approval.
- Every user-visible string goes to both locales — `i18n-parity` test enforces it.
- SEO meta goes through `src/components/ui/SEO.tsx`. Never hand-roll tags.
- Styling stays in Tailwind utilities. No new CSS files unless unavoidable.
- Semantic HTML first, ARIA last. The keyboard path must work.

---

## 6. Verification

Before asking for commit approval, run and **paste real output**:

```bash
npm run typecheck
npm run lint
npm test
npm run check:size
npm run build      # only when touching build, SEO, env, or routing
```

Never write "should work", "likely passes", or a summary of what you assume the commands print.

---

## 7. Tests

- Pure logic (utils, data transforms, validation) → unit test required.
- User-visible behavior (submit, routing, i18n switch) → behavior test with Testing Library.
- Bug fix → a test that fails before and passes after, when testable without a browser.
- Tests live in `__tests__/` next to the subject, named `<Subject>.<behavior>.test.tsx`.
- No whole-tree snapshots, no assertions on implementation details.

---

## 8. Scope discipline

- Touch only what the change needs. No drive-by refactors in the same commit.
- Never edit `dist/`, `coverage/`, `node_modules/`, or generated SEO files.
- Never commit `.env`, `.env.local`, keys, or tokens. Only `.env.example`.
- Never rewrite history (`rebase`, `reset --hard`, amend of a pushed commit) without approval.
- Unrelated bug found: note it under "Out of scope" in the artifact and keep going.
- If a request conflicts with a rule here, stop and ask. Never bend a rule silently.

---

## 9. Definition of Done

A work unit is done when:

- [ ] Typecheck, lint, and tests pass (real output shown)
- [ ] `npm run check:size` passes
- [ ] No file outside the declared scope changed
- [ ] The commit message passes `scripts/check-commit-msg.mjs`
- [ ] The human approved the commit (R1)

A change is done when, additionally:

- [ ] `openspec/changes/<id>/` reflects what was actually built
- [ ] Specs are updated when behavior changed
- [ ] The change is archived with a passing verify report
