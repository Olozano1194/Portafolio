# Tasks: Contact Form Hardening

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 350–450 (component ~100, tests ~250, i18n/docs ~30) |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: implementation + config/docs → PR 2: test suite |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Hardened submit + i18n keys + env/docs | PR 1 | `npm run typecheck && npm run build` | `npm run dev` → submit with/without `.env` | Revert the 5 touched files |
| 2 | ContactoSection vitest suite | PR 2 | `npx vitest run src/components/sections/__tests__/ContactoSection.test.tsx` | N/A: jsdom unit tests, no live server | Delete new test file |

## Phase 1: Foundation (i18n + config)

- [ ] 1.1 Add 5 keys `contact.toast.{success,error,envMissing}`, `contact.form.{sending,emailSubject}` to `src/locales/es/translation.json` (values: design i18n table).
- [ ] 1.2 Add the same 5 keys to `src/locales/en/translation.json`.
- [ ] 1.3 Create `.env.example` with `VITE_CONTACTFORM_URL=` placeholder + Formspree comment; no live URL (guard R3).

## Phase 2: Core Implementation — `src/components/sections/ContactoSection.tsx`

- [ ] 2.1 Wrap `onSubmit`: honeypot `getValues('website')` filled → `preventDefault()` + silent return, else `handleSubmit(onValid)` (D2, pipeline order).
- [ ] 2.2 Env guard first in `onValid`, submit-time read of `import.meta.env.VITE_CONTACTFORM_URL`; missing → envMissing toast, return before `setIsLoading` (D3, guard R1/R2).
- [ ] 2.3 Toasts: success → `t('contact.toast.success')` + `reset()`; failure → generic `t('contact.toast.error')`; drop `result.message`; keep `finally` (D4/D6, toasts R1–R3).
- [ ] 2.4 Hidden `_subject` input value from `t('contact.form.emailSubject')` (D5, submit R4).
- [ ] 2.5 Button: `disabled={isLoading}`, `aria-busy`, spinner + `t('contact.form.sending')`; `if (isLoading) return` at handler top (D6, submit R3).
- [ ] 2.6 Unique error ids `nombre-error`/`email-error`/`mensaje-error`, per-field `aria-describedby`, `role="alert"` — fixes duplicate `mensaje-error` (validation R5).
- [ ] 2.7 Honeypot input: add `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"` (validation R4).

## Phase 3: Testing — `src/components/sections/__tests__/ContactoSection.test.tsx` (new)

- [ ] 3.1 Scaffold: `vi.mock('react-i18next')`, `global.fetch = vi.fn()`, toast spy per `HeroSection.test.tsx`.
- [ ] 3.2 Honeypot filled → no fetch/toast; invalid email/short name/message → no fetch, `aria-invalid`, inline error (validation R1–R5).
- [ ] 3.3 `vi.stubEnv` unset → envMissing toast, no fetch, loading never set; set → fetch issued (guard R1/R2).
- [ ] 3.4 2xx → success toast + reset; 422/network → error toast, fields kept, exactly one toast (toasts R1–R3).
- [ ] 3.5 Second click while in flight → single fetch, button disabled with spinner; loading clears on settle (submit R3).

## Phase 4: Docs & Quality Gate

- [ ] 4.1 `README.md` line 12: EmailJS → Formspree + `.env.example` setup note.
- [ ] 4.2 Run `npm run typecheck && npm run lint && npm run test && npm run build`; all pass (proposal success criteria).
