# Design: Contact Form Hardening

## Technical Approach

Single-component hardening of `ContactoSection.tsx` per proposal Option A: reorder the submit pipeline to match `contact-form-submit` (honeypot → guard → validation → loading → fetch → toast), replace hardcoded Spanish strings with i18n keys, add button loading UI, and document the env var. **Zero new dependencies.** Validation stays inline react-hook-form — its rules already encode spec R1–R3 and all 8 validation error keys already exist in both locales.

## Architecture Decisions

### D1 — Validation: inline RHF rules, no Zod

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Zod + `@hookform/resolvers` | Declarative schema; but 2 new deps (neither installed), error→i18n mapping layer, larger diff | ✗ |
| Inline `register` rules (existing) | Already enforces email pattern, 10–500, 4–20 with `t()` messages; zero deps, minimal diff | ✓ |

### D2 — Honeypot before validation: submit wrapper

RHF `handleSubmit` validates *before* `onValid` runs, so a honeypot check inside `onValid` executes after validation — violating the pipeline order mandated by `contact-form-submit` (API block). Wrap the form's `onSubmit` to read the live field and abort before delegating:

```tsx
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  if (getValues('website')) { e.preventDefault(); return; } // silent: no toast, no fetch
  void handleSubmit(onValid)(e);
};
```

Alternative (first line in `onValid`): idiomatic but validates first — rejected; the wrapper costs ~3 lines and matches spec order exactly.

### D3 — Env guard inside `onValid`, before `setIsLoading`

Read `import.meta.env.VITE_CONTACTFORM_URL` **at submit time**, not module scope — module-scope reads freeze at import and defeat `vi.stubEnv` in tests. On missing/empty: `toast.error(t('contact.toast.envMissing')); return;` — `isLoading` never set (guard non-functional requirement).

### D4 — Generic error toast; drop server-message passthrough

Current code surfaces `result.message` (Formspree English) plus a hardcoded ES fallback. Always use `toast.error(t('contact.toast.error'))` for non-2xx/network/malformed body: server messages are untranslated and leak internals. Exactly one toast per attempt (toasts UX rule).

### D5 — Localize `_subject`

`"Nuevo mensaje desde la web"` is the last hardcoded Spanish string; proposal success criteria require zero. Add `contact.form.emailSubject` and pass `t(...)` into the hidden `_subject` input.

### D6 — Keep `useState(isLoading)` + `finally`

RHF exposes `formState.isSubmitting`, but the submit spec mandates explicit `finally` clearing; keep the existing boolean (minimal diff). Guard at handler top (`if (isLoading) return`) plus button `disabled` blocks double-submit.

## Data Flow

    form onSubmit
      → honeypot filled? ──yes──► silent abort (no toast, no fetch, no validation)
      → handleSubmit(onValid)
          validation fail ──► inline i18n errors + aria-invalid (stays idle)
          pass
      → env guard fail ──► toast envMissing, return (isLoading untouched)
      → setIsLoading(true) → fetch POST JSON (Accept: application/json)
          ├─ 2xx ──► toast.success → reset()
          └─ else/throw ──► toast.error
      → finally setIsLoading(false)

States: `idle → validating (synchronous, owned by RHF) → loading → idle`; success vs error distinguished only by toast. A boolean suffices — no state enum.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/sections/ContactoSection.tsx` | Modify | Submit wrapper (D2) + env guard (D3) + generic i18n toasts (D4); button `disabled`/`aria-busy` + spinner icon + `t('contact.form.sending')` label; unique error ids `nombre-error`/`email-error`/`mensaje-error` with per-field `aria-describedby` and `role="alert"` (fixes duplicated `mensaje-error` id); honeypot gets `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"` |
| `src/locales/es/translation.json` | Modify | Add 5 keys (see i18n Keys) |
| `src/locales/en/translation.json` | Modify | Same 5 keys |
| `.env.example` | Create | `VITE_CONTACTFORM_URL=` placeholder + Formspree comment; no live URL |
| `README.md` | Modify | Line 12: EmailJS → Formspree + `.env` setup note |

## i18n Keys

| Key | ES intent | EN intent |
|-----|-----------|-----------|
| `contact.toast.success` | Mensaje enviado; respondo en menos de 24 h | Message sent; you'll get a reply within 24 hours |
| `contact.toast.error` | No se pudo enviar el mensaje. Intenta de nuevo | Sorry, your message could not be sent. Please try again |
| `contact.toast.envMissing` | Formulario sin configurar. Contacta por otro medio | Contact form is not configured. Please reach out another way |
| `contact.form.sending` | Enviando… | Sending… |
| `contact.form.emailSubject` | Nuevo mensaje desde la web | New message from the website |

Validation keys (`contact.form.errors.*`, 8 total): **already present in both files — unchanged.**

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | Honeypot abort (no fetch/toast); invalid email/name/message → no fetch, `aria-invalid`, inline error; env missing via `vi.stubEnv` → envMissing toast, button never disabled; success → toast + reset; failure → error toast, fields kept; double-click → single fetch | vitest + RTL; mock `global.fetch` (`vi.fn`), spy `react-hot-toast`, `vi.mock('react-i18next')` per `HeroSection.test.tsx` convention |
| Quality gate | `typecheck`, `lint`, `test`, `build` | npm scripts |
| E2E | None — no E2E infra; manual Formspree send post-deploy | Manual |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Client-side fetch only; spam handled by honeypot + Formspree.

## Migration / Rollout

No migration. Deployments must set `VITE_CONTACTFORM_URL` (e.g. Vercel env var) at build time. Fresh clones: copy `.env.example` → `.env`. Rollback: revert the single commit; endpoint untouched.

## Open Questions

- Stale `openspec/config.yaml` (declares `language: JavaScript`, `testing: none` vs actual TSX + vitest) — proposal flags it for a parallel change; excluded here.
